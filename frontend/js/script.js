console.log("Higher or Lower");
let jugadores = [
    { nombre: "Lionel Messi", equipo: "Inter Miami", posicion: "Delantero", valor: 18000000, imagen: "img/messi.jpg" },
    { nombre: "Kylian Mbappé", equipo: "Real Madrid", posicion: "Delantero", valor: 180000000, imagen: "img/mbappe.png" },
    { nombre: "Erling Haaland", equipo: "Manchester City", posicion: "Delantero", valor: 180000000, imagen: "img/haaland.jpg" },
    { nombre: "Jude Bellingham", equipo: "Real Madrid", posicion: "Mediocampista", valor: 180000000, imagen: "img/bellingham.jpg" },
    { nombre: "Vinícius Júnior", equipo: "Real Madrid", posicion: "Delantero", valor: 150000000, imagen: "img/vinicius.jpg" },
    { nombre: "Lamine Yamal", equipo: "Barcelona", posicion: "Delantero", valor: 180000000, imagen: "img/yamal.jpg" },
    { nombre: "Bukayo Saka", equipo: "Arsenal", posicion: "Delantero", valor: 140000000, imagen: "img/saka.jpg" },
    { nombre: "Phil Foden", equipo: "Manchester City", posicion: "Mediocampista", valor: 130000000, imagen: "img/foden.jpg" },
    { nombre: "Robert Lewandowski", equipo: "Barcelona", posicion: "Delantero", valor: 15000000, imagen: "img/lewandowski.jpg" },
    { nombre: "Kevin De Bruyne", equipo: "Napoli", posicion: "Mediocampista", valor: 20000000, imagen: "img/debruyne.jpg" },
    { nombre: "Mohamed Salah", equipo: "Liverpool", posicion: "Delantero", valor: 50000000, imagen: "img/salah.jpg" },
    { nombre: "Virgil van Dijk", equipo: "Liverpool", posicion: "Defensor", valor: 25000000, imagen: "img/vandijk.jpg" },
    { nombre: "Thibaut Courtois", equipo: "Real Madrid", posicion: "Arquero", valor: 35000000, imagen: "img/courtois.jpg" },
    { nombre: "Rodri Hernández", equipo: "Manchester City", posicion: "Mediocampista", valor: 110000000, imagen: "img/rodri.jpg" },
    { nombre: "Florian Wirtz", equipo: "Liverpool", posicion: "Mediocampista", valor: 130000000, imagen: "img/wirtz.jpg" },
    { nombre: "Jamal Musiala", equipo: "Bayern Múnich", posicion: "Mediocampista", valor: 130000000, imagen: "img/musiala.jpg" },
    { nombre: "Pedri González", equipo: "Barcelona", posicion: "Mediocampista", valor: 120000000, imagen: "img/pedri.jpg" },
    { nombre: "Julián Álvarez", equipo: "Atlético Madrid", posicion: "Delantero", valor: 90000000, imagen: "img/alvarez.jpg" },
    { nombre: "Declan Rice", equipo: "Arsenal", posicion: "Mediocampista", valor: 110000000, imagen: "img/rice.jpg" },
        { nombre: "Gavi", equipo: "Barcelona", posicion: "Mediocampista", valor: 90000000, imagen: "img/gavi.jpg" },
    { nombre: "Federico Valverde", equipo: "Real Madrid", posicion: "Mediocampista", valor: 100000000, imagen: "img/valverde.jpg" },
    { nombre: "Victor Osimhen", equipo: "Galatasaray", posicion: "Delantero", valor: 70000000, imagen: "img/osimhen.jpg" },
    { nombre: "Harry Kane", equipo: "Bayern Múnich", posicion: "Delantero", valor: 75000000, imagen: "img/kane.jpg" },
    { nombre: "Rúben Dias", equipo: "Manchester City", posicion: "Defensor", valor: 75000000, imagen: "img/rubendias.jpg" },
    { nombre: "William Saliba", equipo: "Arsenal", posicion: "Defensor", valor: 95000000, imagen: "img/saliba.jpg" },
    { nombre: "Joško Gvardiol", equipo: "Manchester City", posicion: "Defensor", valor: 90000000, imagen: "img/gvardiol.jpg" },
    { nombre: "Alessandro Bastoni", equipo: "Inter", posicion: "Defensor", valor: 85000000, imagen: "img/bastoni.jpg" },
    { nombre: "Achraf Hakimi", equipo: "PSG", posicion: "Defensor", valor: 80000000, imagen: "img/hakimi.jpg" },
    { nombre: "Trent Alexander-Arnold", equipo: "Real Madrid", posicion: "Defensor", valor: 60000000, imagen: "img/trent.jpg" },
    { nombre: "Theo Hernández", equipo: "Milan", posicion: "Defensor", valor: 55000000, imagen: "img/theo.jpg" },
    { nombre: "Martin Ødegaard", equipo: "Arsenal", posicion: "Mediocampista", valor: 100000000, imagen: "img/odegaard.jpg" },
    { nombre: "Bruno Fernandes", equipo: "Manchester United", posicion: "Mediocampista", valor: 60000000, imagen: "img/bruno.jpg" },
    { nombre: "Lautaro Martínez", equipo: "Inter", posicion: "Delantero", valor: 100000000, imagen: "img/lautaro.jpg" },
    { nombre: "Cole Palmer", equipo: "Chelsea", posicion: "Mediocampista", valor: 120000000, imagen: "img/palmer.jpg" },
    { nombre: "Alexander Isak", equipo: "Liverpool", posicion: "Delantero", valor: 140000000, imagen: "img/isak.jpg" },
    { nombre: "Nico Williams", equipo: "Athletic Bilbao", posicion: "Delantero", valor: 90000000, imagen: "img/nicowilliams.jpg" },
    { nombre: "Rafael Leão", equipo: "Milan", posicion: "Delantero", valor: 80000000, imagen: "img/leao.jpg" },
    { nombre: "Enzo Fernández", equipo: "Chelsea", posicion: "Mediocampista", valor: 90000000, imagen: "img/enzo.jpg" },
    { nombre: "Moisés Caicedo", equipo: "Chelsea", posicion: "Mediocampista", valor: 110000000, imagen: "img/caicedo.jpg" }
];

let vidas = 3;
let puntaje = 0;
let ronda = 1;
let mejorPuntaje = 0;

let jugador1;
let jugador2;

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
    document.getElementById("valor1").innerHTML = "€" + jugador1.valor.toLocaleString();
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

    let correcto = false;

    if (respuesta == "mayor") {
        if (jugador1.valor >= jugador2.valor) correcto = true;
    } else {
        if (jugador1.valor <= jugador2.valor) correcto = true;
    }

    document.getElementById("valor2").innerHTML = "€" + jugador2.valor.toLocaleString();

    if (correcto) {

        puntaje++;
        ronda++;

        if (puntaje > mejorPuntaje) mejorPuntaje = puntaje;

        if (puntaje == 10) {
            actualizarPantalla();
            setTimeout(() => {
                alert("¡¡GANASTE EL JUEGO!!");
                if (confirm("¿Querés volver a jugar?")) location.reload();
            }, 800);
            return;
        }

        actualizarPantalla();
        setTimeout(() => { nuevoRetador(); }, 800);

    } else {

        vidas--;
        actualizarPantalla();

        if (vidas == 0) {
            setTimeout(() => {
                if (confirm("Perdiste. ¿Querés volver a jugar?")) location.reload();
            }, 800);
            return;
        }

        setTimeout(() => { iniciarRonda(); }, 800);
    }

}

document.getElementById("mayor").addEventListener("click", function () {
    verificar("mayor");
});

document.getElementById("menor").addEventListener("click", function () {
    verificar("menor");
});

actualizarPantalla();
iniciarRonda();