var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.get("/listar", function(req,res){
    servidorController.listar(req, res);
})

router.get("/selecionar/:codigo", function(req,res){
    servidorController.selecionar(req, res);
})

router.post("/cadastrar", function (req, res) {
    servidorController.cadastrar(req, res);
})
module.exports = router;