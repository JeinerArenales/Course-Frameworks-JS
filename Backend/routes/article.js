"use strict";

var express = require("express");
var ArticleController = require("../controllers/article");

var router = express.Router();

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './upload/articles' });

//Rutas de prueba
router.get("/test-controller", ArticleController.test);

router.post("/datos-curso", ArticleController.datosCurso);

//Rutas para Articulos

router.post("/save", ArticleController.save);
router.get("/articles", ArticleController.getArticles);
router.get("/articles/:last?", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticleById);
router.put("/article/:id", ArticleController.updateArticle);
router.delete("/article/:id", ArticleController.deleteArticle);
router.post("/upload-image/:id", mdUpload, ArticleController.uploadArticle);

module.exports = router;
