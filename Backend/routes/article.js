"use strict";

var express = require("express");
var ArticleController = require("../controllers/article");

var router = express.Router();

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

module.exports = router;
