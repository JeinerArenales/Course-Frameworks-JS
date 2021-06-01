"use strict";

var validator = require('validator');
var Article = require('../models/article');

var contoller = {
    datosCurso: (req, res) => {
        return res.status(200).send({
            course: "master en Frameworks",
            autor: "Jeiner Arenales",
        });
    },
    test: (req, res) => {
        return res.status(200).send({
            message: "Accion Test",
        });
    },
    save: (req, res) => {
        var params = req.body;
        try {

            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);

        } catch (err) {

            return res.status(200).send({
                status: "error",
                message: "Faltan datos por enviar",
            })

        }

        if (validateTitle && validateContent) {

            var article = new Article();

            article.title = params.title;
            article.content = params.content;
            article.image = null;

            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        tatus: "error",
                        message: "Articulo no se ha guardado",
                    })
                }

                return res.status(200).send({
                    status: "success",
                    article: articleStored,
                });

            })

        } else {
            return res.status(200).send({
                tatus: "error",
                message: "Datos Invalidos",
            })
        }

    },
};

module.exports = contoller;
