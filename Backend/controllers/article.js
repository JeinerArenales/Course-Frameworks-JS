"use strict";

var validator = require('validator');
var fs = require('fs');
var path = require('path');
var Article = require('../models/article');
const { exists } = require('../models/article');

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
        var query = Article.find({});
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id').exec((err, articles) => {
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
    },
    getArticleById: (req, res) => {
        var id = req.params.id;
        if (!id) {
            return res.status(404).send({
                status: "error",
                message: "id no encontrado",
            });
        }
        Article.findById(id, (err, article) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Error Servidor",
                });
            }
            if (!article) {
                return res.status(404).send({
                    status: "error",
                    message: "No existe el articulo",
                });
            }
            return res.status(200).send({
                status: "success",
                article,
            });
        })
    },
    updateArticle: (req, res) => {
        var id = req.params.id;
        if (!id) {
            return res.status(404).send({
                status: "error",
                message: "id no encontrado",
            });
        }
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
            Article.findOneAndUpdate({ _id: id }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error al actualizar",
                    })
                }
                if (!articleUpdated) {
                    return res.status(404).send({
                        status: "error",
                        message: "No existe article",
                    })
                }
                return res.status(200).send({
                    status: "Success",
                    article: articleUpdated,
                })
            });
        } else {
            return res.status(200).send({
                status: "error",
                message: "Validacion incorrecta",
            })
        }
    },
    deleteArticle: (req, res) => {
        var id = req.params.id;
        if (!id) {
            return res.status(404).send({
                status: "error",
                message: "id no encontrado",
            });
        }
        Article.findOneAndDelete({ _id: id }, (err, articleRemove) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Error al Eliminar",
                })
            }
            if (!articleRemove) {
                return res.status(404).send({
                    status: "error",
                    message: "No existe article",
                })
            }
            return res.status(200).send({
                status: "Success",
                article: articleRemove,
            })
        });
    },
    uploadArticle: (req, res) => {
        var fileName = 'Imagen no subida';
        if (!req.files) {
            return res.status(404).send({
                status: "error",
                message: fileName,
            });
        }
        var filePath = req.files.file0.path;
        var fileSplit = filePath.split('\\');
        var file_Name = fileSplit[2];
        var extensionSplit = file_Name.split('\.');
        var fileExt = extensionSplit[1];
        if (fileExt != 'png' && fileExt != 'jpg' && fileExt != 'jpeg' && fileExt != 'gif') {
            fs.unlink(filePath, (err) => {
                return res.status(200).send({
                    status: "error",
                    message: "Error del servidor",
                })
            });
        } else {
            var id = req.params.id;
            Article.findOneAndUpdate({ _id: id }, { image: file_Name }, { new: true }, (err, articleUpdated) => {

                if (err || !articleUpdated) {
                    return res.status(500).send({
                        status: "error",
                        message: "error del servidor",
                    })
                }

                return res.status(200).send({
                    status: "success",
                    article: articleUpdated,
                })
            })
        }
    },
    getImage: (req, res) => {
        var file = req.params.image;
        var pathFile = `./upload/articles/${file}`;
        fs.exists(pathFile, (exist) => {
            if (exist) {
                return res.sendFile(path.resolve(pathFile))
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "La imagen no existe",
                })
            }
        })
    },
    searchArticle: (req, res) => {
        var searchString = req.params.search;
        Article.find({
            "$or": [
                {
                    "title": {
                        "$regex": searchString, "$options": "i"
                    }
                },
                {
                    "content": {
                        "$regex": searchString, "$options": "i"
                    }
                },
            ]
        }).sort([['date', 'descending']])
        .exec((err, articles) => {
            if (err) {
                return res.status(404).send({
                    status: "error",
                    message: "Error de Servidor",
                })
            }
            if (!articles || articles.length <= 0) {
                return res.status(404).send({
                    status: "error",
                    message: "Articulos no enconttrados",
                })
            }
            return res.status(404).send({
                status: "success",
                articles
            })
        })
    }
};

module.exports = contoller;
