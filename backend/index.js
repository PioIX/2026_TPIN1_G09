const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",   // poné acá la contraseña real que le pusiste a root en MySQL Workbench
    database: "higher_or_lower"  // poné acá el nombre real de tu base (schema) en Workbench
});

conexion.connect(function(error){
    if(error){
        console.log("Error al conectar con MySQL:", error.message);
    }else{
        console.log("Base de datos conectada");
    }
});

// ==========================
// REGISTRO (con validación de duplicados)
// ==========================

app.post("/api/register", function(req,res){

    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    const sqlVerificar = "SELECT * FROM usuario WHERE nombre_usuario=? OR dni=?";

    conexion.query(sqlVerificar, [usuario, dni], function(error, resultado){

        if(error){
            return res.status(500).json({ mensaje: "Error al verificar usuario" });
        }

        if(resultado.length > 0){
            return res.status(400).json({ mensaje: "El usuario o DNI ya está registrado" });
        }

        const sqlInsertar = "INSERT INTO usuario (dni, nombre, nombre_usuario, contrasena, puntaje) VALUES (?,?,?,?,0)";

        conexion.query(sqlInsertar, [dni, nombre, usuario, contrasena], function(error){

            if(error){
                return res.status(500).json({ mensaje: "Error al registrar" });
            }

            res.json({ mensaje: "Usuario registrado correctamente" });

        });

    });

});

// ==========================
// LOGIN
// ==========================

app.post("/api/login", function(req,res){

    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    const sql = "SELECT * FROM usuario WHERE nombre_usuario=? AND contrasena=?";

    conexion.query(sql, [usuario, contrasena], function(error, resultado){

        if(error){
            return res.status(500).json({ mensaje: "Error del servidor" });
        }

        if(resultado.length > 0){

            const user = resultado[0];

            res.json({
                acceso: true,
                id_usuario: user.id,
                nombre_usuario: user.nombre_usuario,
                esAdmin: user.nombre_usuario === "admin"
            });

        }else{

            res.status(401).json({
                acceso: false,
                mensaje: "Usuario o contraseña incorrectos"
            });

        }

    });

});

// ==========================
// JUGADORES (público: leer)
// ==========================

app.get("/api/jugadores", function(req,res){

    conexion.query("SELECT * FROM jugador_futbol", function(error, resultado){
        if(error){
            return res.json([]);
        }
        res.json(resultado);
    });

});

// ==========================
// JUGADORES (admin: CRUD)
// ==========================

app.post("/api/jugadores", function(req,res){

    const { nombre, equipo, posicion, valor_mercado, imagen } = req.body;

    const sql = "INSERT INTO jugador_futbol (nombre, equipo, posicion, valor_mercado, imagen) VALUES (?,?,?,?,?)";

    conexion.query(sql, [nombre, equipo, posicion, valor_mercado, imagen], function(error){
        if(error){
            return res.status(500).json({ success:false, mensaje:"No se pudo agregar" });
        }
        res.json({ success:true, mensaje:"Jugador agregado" });
    });

});

app.put("/api/jugadores/:id", function(req,res){

    const id = req.params.id;
    const { nombre, equipo, posicion, valor_mercado, imagen