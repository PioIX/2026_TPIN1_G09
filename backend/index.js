const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "higher_or_lower"
});

conexion.connect(function(error){
    if(error){
        console.log("Error al conectar con MySQL");
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

    const sqlVerificar = "SELECT * FROM Usuario WHERE nombre_usuario=? OR dni=?";

    conexion.query(sqlVerificar, [usuario, dni], function(error, resultado){

        if(error){
            return res.status(500).json({ mensaje: "Error al verificar usuario" });
        }

        if(resultado.length > 0){
            return res.status(400).json({ mensaje: "El usuario o DNI ya está registrado" });
        }

        const sqlInsertar = "INSERT INTO Usuario (dni, nombre, nombre_usuario, contrasena) VALUES (?,?,?,?)";

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

    const sql = "SELECT * FROM Usuario WHERE nombre_usuario=? AND contrasena=?";

    conexion.query(sql, [usuario, contrasena], function(error, resultado){

        if(error){
            return res.status(500).json({ mensaje: "Error del servidor" });
        }

        if(resultado.length > 0){

            const user = resultado[0];

            res.json({
                acceso: true,
                id_usuario: user.id_usuario,
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

    const sql = "SELECT * FROM Jugador_Futbol";

    conexion.query(sql, function(error, resultado){
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

    const { nombre, club, posicion, valor, imagen } = req.body;

    const sql = "INSERT INTO Jugador_Futbol (nombre, club, posicion, valor, imagen) VALUES (?,?,?,?,?)";

    conexion.query(sql, [nombre, club, posicion, valor, imagen], function(error){
        if(error){
            return res.status(500).json({ success:false, mensaje:"No se pudo agregar" });
        }
        res.json({ success:true, mensaje:"Jugador agregado" });
    });

});

app.put("/api/jugadores/:id", function(req,res){

    const id = req.params.id;
    const { nombre, club, posicion, valor, imagen } = req.body;

    const sql = "UPDATE Jugador_Futbol SET nombre=?, club=?, posicion=?, valor=?, imagen=? WHERE id=?";

    conexion.query(sql, [nombre, club, posicion, valor, imagen, id], function(error){
        if(error){
            return res.status(500).json({ success:false, mensaje:"No se pudo editar" });
        }
        res.json({ success:true, mensaje:"Jugador actualizado" });
    });

});

app.delete("/api/jugadores/:id", function(req,res){

    const id = req.params.id;

    conexion.query("DELETE FROM Jugador_Futbol WHERE id=?", [id], function(error){
        if(error){
            return res.status(500).json({ success:false, mensaje:"No se pudo eliminar" });
        }
        res.json({ success:true, mensaje:"Jugador eliminado" });
    });

});

// ==========================
// GUARDAR PARTIDA / PUNTAJE
// ==========================

app.post("/api/partida", function(req,res){

    const id_usuario = req.body.id_usuario;
    const puntaje = req.body.puntaje;

    const sql = "INSERT INTO Partida (id_usuario, puntaje) VALUES (?,?)";

    conexion.query(sql, [id_usuario, puntaje], function(error){
        if(error){
            return res.status(500).json({ mensaje: "Error" });
        }
        res.json({ mensaje: "Puntaje guardado" });
    });

});

// ==========================
// RANKING / MEJORES PUNTAJES
// ==========================

app.get("/api/ranking", function(req,res){

    const sql = `
        SELECT Usuario.nombre_usuario, MAX(Partida.puntaje) AS mejor_puntaje
        FROM Partida
        JOIN Usuario ON Usuario.id_usuario = Partida.id_usuario
        GROUP BY Usuario.id_usuario
        ORDER BY mejor_puntaje DESC
        LIMIT 10
    `;

    conexion.query(sql, function(error, resultado){
        if(error){
            return res.json([]);
        }
        res.json(resultado);
    });

});

// ==========================
// USUARIOS (admin: eliminar)
// ==========================

app.delete("/api/usuarios/:id", function(req,res){

    const id = req.params.id;

    conexion.query("DELETE FROM Usuario WHERE id_usuario=?", [id], function(error){
        if(error){
            return res.status(500).json({ success:false, mensaje:"No se pudo eliminar" });
        }
        res.json({ success:true, mensaje:"Usuario eliminado" });
    });

});

// ==========================
// SERVIDOR
// ==========================

app.listen(4000, function(){
    console.log("Servidor iniciado en http://localhost:4000");
});