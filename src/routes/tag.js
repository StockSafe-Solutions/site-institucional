var express = require("express");
var router = express.Router();

var tagController = require("../controllers/tagController");

router.get("/listarTags", function(req,res){
    tagController.listarTags(req, res);
})

router.get("/kpisTags", function(req, res){
    tagController.kpisTags(req, res)
})

router.get("/tagsPorNome/", function(req, res){
    tagController.tagsPorNome(req, res);
})
router.get("/tagsPorNome/:nomeTags", function(req, res){
    tagController.tagsPorNome(req, res);
})

router.post("/graficosPorTags", function(req, res){
    tagController.graficosPorTags(req, res);
})

router.post("/kpisPorTags", function(req, res){
    tagController.kpisPorTags(req, res);
})

module.exports = router;