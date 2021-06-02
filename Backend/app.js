"use strict";

//Cargar modulos de node para crear servidor

var express = require("express");
var bodyParser = require("body-parser");

//Ejecutar express

var app = express();

//Cargar Ficheros Rutas

var articleRoutes = require("./routes/article");

//Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Cors

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Anadir prefijos a rutas / cargar rutas

app.use("/api", articleRoutes);

//Exportar modulo

module.exports = app;
