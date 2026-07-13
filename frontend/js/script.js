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