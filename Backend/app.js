'use strict'

//Cargar modulos de node para crear servidor

var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express

var app = express();

//Cargar Ficheros Rutas

var articleRoutes = require('./routes/article');

//Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Cors

//Anadir prefijos a rutas / cargar rutas

app.use( '/api', articleRoutes );

//Exportar modulo

module.exports = app;