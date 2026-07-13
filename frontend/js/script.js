console.log("Higher or Lower");
let jugadores = [
    {
        nombre: "Lionel Messi",
        equipo: "Inter Miami",
        posicion: "Delantero",
        valor: 18000000,
        imagen: "public/jugador1.jpg"
    },
    {
        nombre: "Kylian Mbappé",
        equipo: "Real Madrid",
        posicion: "Delantero",
        valor: 180000000,
        imagen: "public/jugador2.jpg"
    },
    {
        nombre: "Erling Haaland",
        equipo: "Manchester City",
        posicion: "Delantero",
        valor: 180000000,
        imagen: "public/haaland.jpg"
    },
    {
        nombre: "Jude Bellingham",
        equipo: "Real Madrid",
        posicion: "Mediocampista",
        valor: 180000000,
        imagen: "public/bellingham.jpg"
    }
];

let vidas = 3;
let puntaje = 0;
let ronda = 1;

let jugador1;
let jugador2;

function numeroAleatorio() {
    return Math.floor(Math.random() * jugadores.length);
}

function cargarJugadores() {

    jugador1 = jugadores[numeroAleatorio()];
    jugador2 = jugadores[numeroAleatorio()];

    while (jugador1 == jugador2) {
        jugador2 = jugadores[numeroAleatorio()];
    }

    document.getElementById("nombre1").innerHTML = jugador1.nombre;
    document.getElementById("equipo1").innerHTML = jugador1.equipo;
    document.getElementById("posicion1").innerHTML = jugador1.posicion;
    document.getElementById("valor1").innerHTML = "€" + jugador1.valor.toLocaleString();
    document.querySelectorAll("img")[0].src = jugador1.imagen;

    document.getElementById("nombre2").innerHTML = jugador2.nombre;
    document.getElementById("equipo2").innerHTML = jugador2.equipo;
    document.getElementById("posicion2").innerHTML = jugador2.posicion;
    document.querySelectorAll("img")[1].src = jugador2.imagen;

}

function actualizarPantalla() {

    document.getElementById("vidas").innerHTML = vidas;
    document.getElementById("puntaje").innerHTML = puntaje;
    document.getElementById("ronda").innerHTML = ronda;

}

function verificar(respuesta) {

    let correcto = false;

    if (respuesta == "mayor") {

        if (jugador2.valor >= jugador1.valor) {
            correcto = true;
        }

    } else {

        if (jugador2.valor <= jugador1.valor) {
            correcto = true;
        }

    }

    if (correcto) {

        puntaje++;
        ronda++;

        if (puntaje == 10) {

            alert("¡¡GANASTE EL JUEGO!!");

            if(confirm("¿Querés volver a jugar?")){
                location.reload();
            }

            return;

        }

    } else {

        vidas--;

        if (vidas == 0) {

            if(confirm("Perdiste. ¿Querés volver a jugar?")){
                location.reload();
            }else{
                window.close();
            }

            return;

        }

    }

    actualizarPantalla();
    cargarJugadores();

}

document.getElementById("mayor").addEventListener("click", function(){

    verificar("mayor");

});

document.getElementById("menor").addEventListener("click", function(){

    verificar("menor");

});

actualizarPantalla();
cargarJugadores();