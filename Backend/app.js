'use strict'

//Cargar modulos de node para crear servidor

var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express

var app = express();

//Cargar Ficheros Rutas

//Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Cors

//Anadir prefijos a rutas

//Prueba

app.get('/probando', ( req, res ) => {
    return res.status(200).send(
        {
            course: "master en Frameworks",
            autor: "Jeiner Arenales"
        }
    )
})

//Exportar modulo

module.exports = app;