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




app.post("/registro", function(req,res){

    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    const sql = 'INSERT INTO Usuario(nombre, nombre_usuario, contrasena) VALUES ("' + req.body.nombre + '", "' + req.body.usuario + '", "' + req.body.contrasena + '")';

    conexion.query(sql,[nombre,usuario,contrasena],function(error){

        if(error){

            res.json({
                mensaje:"Error al registrar"
            });

        }else{

            res.json({
                mensaje:"Usuario registrado correctamente"
            });

        }

    });

});


// ==========================
// LOGIN
// ==========================

app.post("/login", function(req,res){

    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    const sql = "SELECT * FROM Usuario WHERE nombre_usuario=? AND contrasena=?";

    conexion.query(sql,[usuario,contrasena],function(error,resultado){

        if(resultado.length>0){

            res.json({
                acceso:true
            });

        }else{

            res.json({
                acceso:false
            });

        }

    });

});


// ==========================
// TODOS LOS JUGADORES
// ==========================

app.get("/api/jugadores",function(req,res){

    const sql = "SELECT * FROM Jugador_Futbol";

    conexion.query(sql,function(error,resultado){

        if(error){

            res.json([]);

        }else{

            res.json(resultado);

        }

    });

});


// ==========================
// GUARDAR PARTIDA
// ==========================

app.post("/partida",function(req,res){

    const id_usuario=req.body.id_usuario;
    const puntaje=req.body.puntaje;

    const sql="INSERT INTO Partida(id_usuario,puntaje) VALUES (?,?)";

    conexion.query(sql,[id_usuario,puntaje],function(error){

        if(error){

            res.json({
                mensaje:"Error"
            });

        }else{

            res.json({
                mensaje:"Puntaje guardado"
            });

        }

    });

});


// ==========================
// MEJOR PUNTAJE
// ==========================

app.get("/mejor/:id",function(req,res){

    const id=req.params.id;

    const sql="SELECT mejor_puntaje FROM Usuario WHERE id_usuario=?";

    conexion.query(sql,[id],function(error,resultado){

        res.json(resultado);

    });

});


// ==========================
// ACTUALIZAR MEJOR PUNTAJE
// ==========================

app.put("/mejor",function(req,res){

    const id=req.body.id_usuario;
    const puntaje=req.body.puntaje;

    const sql="UPDATE Usuario SET mejor_puntaje=? WHERE id_usuario=?";

    conexion.query(sql,[puntaje,id],function(error){

        res.json({
            mensaje:"Actualizado"
        });

    });

});


// ==========================
// SERVIDOR
// ==========================

app.listen(3000,function(){

    console.log("Servidor iniciado en http://localhost:3000");

});