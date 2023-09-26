var express = require("express");
var router = express.Router();

var maquinasController = require("../controllers/maquinasController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    maquinasController.cadastrar(req, res);
}),
router.post("/cadastrarComponentes", function (req, res) {
    maquinasController.cadastrarComponentes(req, res);
})
module.exports = router;