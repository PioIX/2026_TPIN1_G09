const API_URL = "http://localhost:4000";

// ==========================
// PROTECCIÓN DE RUTA
// ==========================

const esAdmin = localStorage.getItem("esAdmin");

if (esAdmin !== "true") {
    alert("No tenés permisos para acceder a esta página");
    window.location.href = "login.html";
}

// ==========================
// PESTAÑAS
// ==========================

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContenidos = document.querySelectorAll(".tab-contenido");

tabBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        tabBtns.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");

        tabContenidos.forEach(tab => tab.classList.add("oculto"));
        document.getElementById("tab-" + btn.dataset.tab).classList.remove("oculto");

        if (btn.dataset.tab === "editar") cargarJugadores();
        if (btn.dataset.tab === "usuarios") cargarUsuarios();

    });

});

// ==========================
// CERRAR SESIÓN
// ==========================

document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
});

// ==========================
// AGREGAR JUGADOR
// ==========================

const formAgregar = document.getElementById("formAgregar");
const mensajeAgregar = document.getElementById("mensajeAgregar");

formAgregar.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const club = document.getElementById("equipo").value;
    const posicion = document.getElementById("posicion").value;
    const valor = document.getElementById("valor").value;
    const imagen = document.getElementById("imagen").value;

    try {

        const res = await fetch(API_URL + "/api/jugadores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, club, posicion, valor, imagen })
        });

        const data = await res.json();

        mensajeAgregar.style.color = data.success ? "#2d6a31" : "#b71c1c";
        mensajeAgregar.textContent = data.mensaje;

        if (data.success) {
            formAgregar.reset();
        }

    } catch (error) {
        mensajeAgregar.style.color = "#b71c1c";
        mensajeAgregar.textContent = "Error de conexión con el servidor";
    }

});

// ==========================
// LISTAR / EDITAR / ELIMINAR JUGADORES
// ==========================

async function cargarJugadores() {

    const cuerpoTabla = document.getElementById("cuerpoTablaJugadores");
    cuerpoTabla.innerHTML = "<tr><td colspan='5'>Cargando...</td></tr>";

    try {

        const res = await fetch(API_URL + "/api/jugadores");
        const jugadores = await res.json();

        cuerpoTabla.innerHTML = "";

        jugadores.forEach(jugador => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${jugador.nombre}</td>
                <td>${jugador.club}</td>
                <td>${jugador.posicion}</td>
                <td>€${Number(jugador.valor).toLocaleString()}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-eliminar">Eliminar</button>
                </td>
            `;

            fila.querySelector(".btn-editar").addEventListener("click", () => abrirModalEditar(jugador));
            fila.querySelector(".btn-eliminar").addEventListener("click", () => eliminarJugador(jugador.id_jugador));

            cuerpoTabla.appendChild(fila);

        });

    } catch (error) {
        cuerpoTabla.innerHTML = "<tr><td colspan='5'>Error al cargar jugadores</td></tr>";
    }

}

function abrirModalEditar(jugador) {

    document.getElementById("editarId").value = jugador.id_jugador;
    document.getElementById("editarNombre").value = jugador.nombre;
    document.getElementById("editarEquipo").value = jugador.club;
    document.getElementById("editarPosicion").value = jugador.posicion;
    document.getElementById("editarValor").value = jugador.valor;
    document.getElementById("editarImagen").value = jugador.imagen;

    document.getElementById("modalEditar").classList.remove("oculto");

}

document.getElementById("btnCancelarEditar").addEventListener("click", () => {
    document.getElementById("modalEditar").classList.add("oculto");
});

document.getElementById("formEditar").addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = document.getElementById("editarId").value;
    const nombre = document.getElementById("editarNombre").value;
    const club = document.getElementById("editarEquipo").value;
    const posicion = document.getElementById("editarPosicion")})