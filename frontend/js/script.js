console.log("Higher or Lower");

const API_URL = "http://localhost:4000";

let jugadores = [];

let vidas = 3;
let puntaje = 0;
let ronda = 1;
let mejorPuntaje = 0;

let jugador1;
let jugador2;

// ==========================
// BOTÓN ADMIN (solo visible si el usuario logueado es admin)
// ==========================

const esAdmin = localStorage.getItem("esAdmin");

if (esAdmin === "true") {
    document.getElementById("btnAdmin").classList.remove("oculto");
}

document.getElementById("btnAdmin").addEventListener("click", function () {
    window.location.href = "admin.html";
});

// ==========================
// CARGAR JUGADORES DESDE EL BACKEND
// ==========================

async function cargarJugadoresDesdeAPI() {
    try {
        const res = await fetch(API_URL + "/api/jugadores");
        jugadores = await res.json();

        if (jugadores.length === 0) {
            alert("No se pudieron cargar los jugadores. Verificá que el servidor esté corriendo.");
            return;
        }

        actualizarPantalla();
        iniciarRonda();

    } catch (error) {
        alert("Error al conectar con el servidor. Verificá que esté corriendo.");
    }
}

function numeroAleatorio() {
    return Math.floor(Math.random() * jugadores.length);
}

function elegirJugadorDistintoDe(...excluidos) {
    let candidato = jugadores[numeroAleatorio()];
    while (excluidos.includes(candidato)) {
        candidato = jugadores[numeroAleatorio()];
    }
    return candidato;
}

function iniciarRonda() {
    jugador1 = elegirJugadorDistintoDe();
    jugador2 = elegirJugadorDistintoDe(jugador1);
    mostrarJugadores();
}

function nuevoRetador() {
    jugador1 = jugador2;
    jugador2 = elegirJugadorDistintoDe(jugador1);
    mostrarJugadores();
}

function mostrarJugadores() {
    document.getElementById("nombre1").innerHTML = jugador1.nombre;
    document.getElementById("equipo1").innerHTML = jugador1.equipo;
    document.getElementById("posicion1").innerHTML = jugador1.posicion;
    document.getElementById("valor1").innerHTML = "€" + Number(jugador1.valor_mercado).toLocaleString();
    document.querySelectorAll("img")[0].src = jugador1.imagen;

    document.getElementById("nombre2").innerHTML = jugador2.nombre;
    document.getElementById("equipo2").innerHTML = jugador2.equipo;
    document.getElementById("posicion2").innerHTML = jugador2.posicion;
    document.getElementById("valor2").innerHTML = "?????";
    document.querySelectorAll("img")[1].src = jugador2.imagen;
}

function actualizarPantalla() {
    document.getElementById("vidas").innerHTML = vidas;
    document.getElementById("puntaje").innerHTML = puntaje;
    document.getElementById("mejorPuntaje").innerHTML = mejorPuntaje;
    document.getElementById("ronda").innerHTML = ronda;
}

function verificar(respuesta) {

    document.getElementById("mayor").disabled = true;
    document.getElementById("menor").disabled = true;

    let correcto = false;

    if (respuesta == "mayor") {
        if (jugador1.valor_mercado >= jugador2.valor_mercado) correcto = true;
    } else {
        if (jugador1.valor_mercado <= jugador2.valor_mercado) correcto = true;
    }

    document.getElementById("valor2").innerHTML = "€" + Number(jugador2.valor_mercado).toLocaleString();

    if (correcto) {

        puntaje++;
        ronda++;

        if (puntaje > mejorPuntaje) mejorPuntaje = puntaje;

        if (puntaje == 10) {
            actualizarPantalla();
            setTimeout(() => {
                finalizarPartida("¡¡GANASTE EL JUEGO!!", "Llegaste a los 10 puntos.");
            }, 800);
            return;
        }

        actualizarPantalla();
        setTimeout(() => {
            nuevoRetador();
            habilitarBotones();
        }, 800);

    } else {

        vidas--;
        actualizarPantalla();

        if (vidas <= 0) {
            setTimeout(() => {
                finalizarPartida("Perdiste", "Te quedaste sin vidas.");
            }, 800);
            return;
        }

        setTimeout(() => {
            iniciarRonda();
            habilitarBotones();
        }, 800);
    }

}

function habilitarBotones() {
    document.getElementById("mayor").disabled = false;
    document.getElementById("menor").disabled = false;
}

// ==========================
// GUARDAR PUNTAJE Y MOSTRAR RANKING
// ==========================

async function finalizarPartida(titulo, mensaje) {

    const id_usuario = localStorage.getItem("id_usuario");

    try {
        await fetch(API_URL + "/api/partida", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_usuario, puntaje })
        });
    } catch (error) {
        console.log("No se pudo guardar el puntaje:", error);
    }

    await mostrarRanking();
    mostrarModal(titulo, mensaje);

}

async function mostrarRanking() {

    const cuerpoRanking = document.getElementById("cuerpoRanking");
    cuerpoRanking.innerHTML = "<tr><td colspan='2'>Cargando...</td></tr>";

    try {

        const res = await fetch(API_URL + "/api/ranking");
        const ranking = await res.json();

        cuerpoRanking.innerHTML = "";

        if (ranking.length === 0) {
            cuerpoRanking.innerHTML = "<tr><td colspan='2'>Todavía no hay puntajes</td></tr>";
            return;
        }

        ranking.forEach(usuario => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario.nombre_usuario}</td>
                <td>${usuario.puntaje}</td>
            `;
            cuerpoRanking.appendChild(fila);
        });

    } catch (error) {
        cuerpoRanking.innerHTML = "<tr><td colspan='2'>Error al cargar el ranking</td></tr>";
    }

}

function mostrarModal(titulo, mensaje) {
    document.getElementById("modalTitulo").innerHTML = titulo;
    document.getElementById("modalMensaje").innerHTML = mensaje;
    document.getElementById("modalResultado").classList.remove("oculto");
}

document.getElementById("btnReintentar").addEventListener("click", function () {
    location.reload();
});

document.getElementById("btnSalir").addEventListener("click", function () {
    document.getElementById("modalResultado").classList.add("oculto");
});

document.getElementById("mayor").addEventListener("click", function () {
    verificar("mayor");
});

document.getElementById("menor").addEventListener("click", function () {
    verificar("menor");
});

cargarJugadoresDesdeAPI();