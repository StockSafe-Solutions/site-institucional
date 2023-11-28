var express = require("express");
var router = express.Router();

var tagController = require("../controllers/tagController");

router.get("/listarTags", function(req,res){
    tagController.listarTags(req, res);
})

router.get("/kpisTags", function(req, res){
    tagController.kpisTags(req, res)
})

router.post("/tagsPorNome", function(req, res){
    tagController.tagsPorNome(req, res);
})

router.post("/graficosPorTags", function(req, res){
    tagController.graficosPorTags(req, res);
})

router.post("/kpisPorTags", function(req, res){
    tagController.kpisPorTags(req, res);
})

router.post("/inserirTag", function(req, res){
    tagController.inserirTag(req, res);
})
router.post("/colocarTagEmServidor", function(req, res){
    tagController.colocarTagEmServidor(req, res);
})

router.delete("/excluirTag", function(req, res){
    tagController.excluirTag(req, res);
})

module.exports = router;