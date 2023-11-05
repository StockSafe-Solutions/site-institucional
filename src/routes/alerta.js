var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/listarAlertas", function(req,res){
    alertaController.listarAlertas(req, res);
})

router.put("/visualizarAlerta/:idAlerta", function(req, res){
    console.log("Rota visualizarAlerta alcançada!");
    alertaController.visualizarAlerta(req,res);
})

module.exports = router;