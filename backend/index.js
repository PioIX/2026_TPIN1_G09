const express = require("express");

const app = express();
const PORT = 3000;

// Permite recibir datos del frontend
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("Servidor Higher or Lower funcionando");
});

// Login
app.post("/login", (req, res) => {

    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    res.json({
        mensaje: "Login correcto",
        usuario: usuario
    });

});

// Registro
app.post("/registro", (req, res) => {

    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    res.json({
        mensaje: "Usuario registrado",
        usuario: usuario
    });

});

// Jugadores
app.get("/jugadores", (req, res) => {

    res.json([
        {
            nombre: "Lionel Messi",
            equipo: "Inter Miami",
            posicion: "Delantero",
            valor: 18000000
        },
        {
            nombre: "Kylian Mbappe",
            equipo: "Real Madrid",
            posicion: "Delantero",
            valor: 170000000
        }
    ]);

});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
