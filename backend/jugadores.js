const express = require("express");
const router = express.Router();

const db = require("../modulos/mysql");

/* ==========================
   OBTENER TODOS LOS JUGADORES
========================== */

router.get("/", (req, res) => {

    const sql = "SELECT * FROM jugadores";

    db.query(sql, (error, resultados) => {

        if(error){
            return res.json({
                success: false,
                message: "Error al obtener jugadores"
            });
        }

        res.json(resultados);

    });

});

/* ==========================
   AGREGAR JUGADOR
========================== */

router.post("/", (req, res) => {

    const datos = req.body;

    const sql = `
        INSERT INTO jugadores
        (nombre, club, posicion, valor, imagen)
        VALUES (?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            datos.nombre,
            datos.club,
            datos.posicion,
            datos.valor,
            datos.imagen
        ],
        (error) => {

            if(error){
                return res.json({
                    success:false,
                    message:"No se pudo agregar el jugador"
                });
            }

            res.json({
                success:true,
                message:"Jugador agregado correctamente"
            });

        }
    );

});

/* ==========================
   EDITAR JUGADOR
========================== */

router.put("/:id", (req,res)=>{

    const id = req.params.id;
    const datos = req.body;

    const sql = `
        UPDATE jugadores
        SET
        nombre=?,
        club=?,
        posicion=?,
        valor=?,
        imagen=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            datos.nombre,
            datos.club,
            datos.posicion,
            datos.valor,
            datos.imagen,
            id
        ],
        (error)=>{

            if(error){
                return res.json({
                    success:false,
                    message:"No se pudo editar"
                });
            }

            res.json({
                success:true,
                message:"Jugador actualizado"
            });

        }
    );

});

/* ==========================
   ELIMINAR JUGADOR
========================== */

router.delete("/:id",(req,res)=>{

    const id = req.params.id;

    const sql =
    "DELETE FROM jugadores WHERE id=?";

    db.query(
        sql,
        [id],
        (error)=>{

            if(error){
                return res.json({
                    success:false,
                    message:"No se pudo eliminar"
                });
            }

            res.json({
                success:true,
                message:"Jugador eliminado"
            });

        }
    );

});

module.exports = router;