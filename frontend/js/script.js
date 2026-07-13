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
    },
    {
        nombre: "Vinícius Júnior",
        equipo: "Real Madrid",
        posicion: "Delantero",
        valor: 150000000,
        imagen: "public/vinicius.jpg"
    },
    {
        nombre: "Lamine Yamal",
        equipo: "Barcelona",
        posicion: "Delantero",
        valor: 180000000,
        imagen: "public/yamal.jpg"
    },
    {
        nombre: "Bukayo Saka",
        equipo: "Arsenal",
        posicion: "Delantero",
        valor: 140000000,
        imagen: "public/saka.jpg"
    },
    {
        nombre: "Phil Foden",
        equipo: "Manchester City",
        posicion: "Mediocampista",
        valor: 130000000,
        imagen: "public/foden.jpg"
    },
    {
        nombre: "Robert Lewandowski",
        equipo: "Barcelona",
        posicion: "Delantero",
        valor: 15000000,
        imagen: "public/lewandowski.jpg"
    },
    {
        nombre: "Kevin De Bruyne",
        equipo: "Napoli",
        posicion: "Mediocampista",
        valor: 20000000,
        imagen: "public/debruyne.jpg"
    },
    {
        nombre: "Mohamed Salah",
        equipo: "Liverpool",
        posicion: "Delantero",
        valor: 50000000,
        imagen: "public/salah.jpg"
    },
    {
        nombre: "Virgil van Dijk",
        equipo: "Liverpool",
        posicion: "Defensor",
        valor: 25000000,
        imagen: "public/vandijk.jpg"
    },
    {
        nombre: "Thibaut Courtois",
        equipo: "Real Madrid",
        posicion: "Arquero",
        valor: 35000000,
        imagen: "public/courtois.jpg"
    },
    {
        nombre: "Rodri Hernández",
        equipo: "Manchester City",
        posicion: "Mediocampista",
        valor: 110000000,
        imagen: "public/rodri.jpg"
    },
    {
        nombre: "Florian Wirtz",
        equipo: "Liverpool",
        posicion: "Mediocampista",
        valor: 130000000,
        imagen: "public/wirtz.jpg"
    },
    {
        nombre: "Jamal Musiala",
        equipo: "Bayern Múnich",
        posicion: "Mediocampista",
        valor: 130000000,
        imagen: "public/musiala.jpg"
    },
    {
        nombre: "Pedri González",
        equipo: "Barcelona",
        posicion: "Mediocampista",
        valor: 120000000,
        imagen: "public/pedri.jpg"
    },
    {
        nombre: "Julián Álvarez",
        equipo: "Atlético Madrid",
        posicion: "Delantero",
        valor: 90000000,
        imagen: "public/alvarez.jpg"
    },
    {
        nombre: "Declan Rice",
        equipo: "Arsenal",
        posicion: "Mediocampista",
        valor: 110000000,
        imagen: "public/rice.jpg"
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