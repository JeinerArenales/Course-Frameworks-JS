'use strict'

var moongose = require('mongoose');
var app = require('./app');
var port = 3900;

moongose.set('useFindAndModify', false);
moongose.Promise = global.Promise;
moongose.connect('mongodb://localhost:27017/curso_master_frameworks',{ useNewUrlParser: true }).then( () => {
    console.log('Conexion a MongoDB Correcta')
    
    //crear servidor

    app.listen(port, () => {
        console.log('Servidor corriendo en http:// localhost:' + port); 
    })
});