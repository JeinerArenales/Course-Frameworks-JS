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
    getArticles: (req, res) => {

        Article.find({}).sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "error al devolver articulos",
                });
            }
            if (!articles) {
                return res.status(404).send({
                    status: "error",
                    message: "No hay articulos",
                });
            }
            return res.status(200).send({
                status: "success",
                articles,
            });
        })
    }
};

module.exports = contoller;
