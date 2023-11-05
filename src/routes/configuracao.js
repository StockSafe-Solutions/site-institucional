var express = require("express");
var router = express.Router();

var configuracaoController = require("../controllers/configuracaoController");

router.get("/listar", function(req,res){
    configuracaoController.listar(req, res);
})

router.put("/alterar/:id", function(req,res){
    configuracaoController.alterar(req, res);
})

module.exports = router;