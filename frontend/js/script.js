console.log("Higher or Lower");
let jugadores = [
    {
        nombre: "Lionel Messi",
        equipo: "Inter Miami",
        posicion: "Delantero",
        valor: 18000000,
        imagen: "img/messi.jpg"
    },
    {
        nombre: "Kylian Mbappé",
        equipo: "Real Madrid",
        posicion: "Delantero",
        valor: 180000000,
        imagen: "img/mbappe.png"
    },
    {
        nombre: "Erling Haaland",
        equipo: "Manchester City",
        posicion: "Delantero",
        valor: 180000000,
        imagen: "img/haaland.jpg"
    },
    {
        nombre: "Jude Bellingham",
        equipo: "Real Madrid",
        posicion: "Mediocampista",
        valor: 180000000,
        imagen: "img/bellingham.jpg"
    },
    {
        nombre: "Vinícius Júnior",
        equipo: "Real Madrid",
        posicion: "Delantero",
        valor: 150000000,
        imagen: "img/vinicius.jpg"
    },
    {
        nombre: "Lamine Yamal",
        equipo: "Barcelona",
        posicion: "Delantero",
        valor: 180000000,
        imagen: "img/yamal.jpg"
    },
    {
        nombre: "Bukayo Saka",
        equipo: "Arsenal",
        posicion: "Delantero",
        valor: 140000000,
        imagen: "img/saka.jpg"
    },
    {
        nombre: "Phil Foden",
        equipo: "Manchester City",
        posicion: "Mediocampista",
        valor: 130000000,
        imagen: "img/foden.jpg"
    },
    {
        nombre: "Robert Lewandowski",
        equipo: "Barcelona",
        posicion: "Delantero",
        valor: 15000000,
        imagen: "img/lewandowski.jpg"
    },
    {
        nombre: "Kevin De Bruyne",
        equipo: "Napoli",
        posicion: "Mediocampista",
        valor: 20000000,
        imagen: "img/debruyne.jpg"
    },
    {
        nombre: "Mohamed Salah",
        equipo: "Liverpool",
        posicion: "Delantero",
        valor: 50000000,
        imagen: "img/salah.jpg"
    },
    {
        nombre: "Virgil van Dijk",
        equipo: "Liverpool",
        posicion: "Defensor",
        valor: 25000000,
        imagen: "img/vandijk.jpg"
    },
    {
        nombre: "Thibaut Courtois",
        equipo: "Real Madrid",
        posicion: "Arquero",
        valor: 35000000,
        imagen: "img/courtois.jpg"
    },
    {
        nombre: "Rodri Hernández",
        equipo: "Manchester City",
        posicion: "Mediocampista",
        valor: 110000000,
        imagen: "img/rodri.jpg"
    },
    {
        nombre: "Florian Wirtz",
        equipo: "Liverpool",
        posicion: "Mediocampista",
        valor: 130000000,
        imagen: "img/wirtz.jpg"
    },
    {
        nombre: "Jamal Musiala",
        equipo: "Bayern Múnich",
        posicion: "Mediocampista",
        valor: 130000000,
        imagen: "img/musiala.jpg"
    },
    {
        nombre: "Pedri González",
        equipo: "Barcelona",
        posicion: "Mediocampista",
        valor: 120000000,
        imagen: "img/pedri.jpg"
    },
    {
        nombre: "Julián Álvarez",
        equipo: "Atlético Madrid",
        posicion: "Delantero",
        valor: 90000000,
        imagen: "img/alvarez.jpg"
    },
    {
        nombre: "Declan Rice",
        equipo: "Arsenal",
        posicion: "Mediocampista",
        valor: 110000000,
        imagen: "img/rice.jpg"
    }
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

// Se usa al iniciar el juego o después de perder una vida: resetea los 2 jugadores
function iniciarRonda() {

    jugador1 = elegirJugadorDistintoDe();
    jugador2 = elegirJugadorDistintoDe(jugador1);

    mostrarJugadores();
}

// Se usa cuando acertás: el jugador2 (revelado) pasa a jugador1, y entra un desafiante nuevo
function nuevoRetador() {}