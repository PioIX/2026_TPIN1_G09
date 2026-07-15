const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: "10.1.5.205",
    user: "2026_5INF_G09",
    password: "brbr",   
    database: "2026_5INF_G09"   
});

conexion.connect(function(error){
    if(error){
        console.log("ERROR COMPLETO:", error);
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
// JUGADORES (admin: agregar)
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

// ==========================
// JUGADORES (admin: editar)
// ==========================

app.put("/api/jugadores/:id", function(req,res){

    const id = req.params.id;
    const { nombre, equipo, posicion, valor_mercado, imagen } = req.body;

    const sql = "UPDATE jugador_futbol SET nombre=?, equipo=?, posicion=?, valor_mercado=?, imagen=? WHERE id=?";

    conexion.query(sql, [nombre, equipo, posicion, valor_mercado, imagen, id], function(error){
        if(error){
            return res.status(500).json({ success:false, mensaje:"No se pudo editar" });
        }
        res.json({ success:true, mensaje:"Jugador actualizado" });
    });

});

// ==========================
// JUGADORES (admin: eliminar)
// ==========================

app.delete("/api/jugadores/:id", function(req,res){

    const id = req.params.id;

    conexion.query("DELETE FROM jugador_futbol WHERE id=?", [id], function(error){
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

    const sqlPartida = "INSERT INTO partida (id_usuario, puntaje) VALUES (?,?)";

    conexion.query(sqlPartida, [id_usuario, puntaje], function(error){

        if(error){
            return res.status(500).json({ mensaje: "Error al guardar partida" });
        }

        const sqlMejor = "UPDATE usuario SET puntaje=? WHERE id=? AND puntaje<?";

        conexion.query(sqlMejor, [puntaje, id_usuario, puntaje], function(){
            res.json({ mensaje: "Puntaje guardado" });
        });

    });

});

// ==========================
// RANKING / MEJORES PUNTAJES
// ==========================

app.get("/api/ranking", function(req,res){

    const sql = `
        SELECT nombre_usuario, puntaje
        FROM usuario
        ORDER BY puntaje DESC
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
// USUARIOS (admin: listar todos)
// ==========================

app.get("/api/usuarios", function(req,res){

    conexion.query("SELECT id, dni, nombre, nombre_usuario, puntaje FROM usuario", function(error, resultado){
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

    conexion.query("DELETE FROM usuario WHERE id=?", [id], function(error){
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

