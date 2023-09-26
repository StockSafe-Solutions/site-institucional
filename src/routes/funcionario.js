var express = require("express")
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A COFIGURAÇÃO DO UP
var funcionarioController = require("../controllers/funcionarioController");

router.post("/cadastrarFuncionario", function (req, res) {
    funcionarioController.cadastrarFuncionario(req, res);
});

router.post('/enviarFoto/:idUsuario', upload.single('foto'), (req, res) => {
    funcionarioController.enviarFoto(req, res);
});

router.post('/autenticar', function (req, res) {
    funcionarioController.autenticar(req, res);
})

router.post('/atualizarDadosFuncionario/:idFuncionario', function (req, res) {
    funcionarioController.atualizarDadosFuncionario(req, res);
});

router.post('/atualizarSenhaFuncionario/:idUsuario', function (req, res) {
    funcionarioController.atualizarSenhaFuncionario(req, res);
});

router.post('/mostrarDados', function (req, res) {
    funcionarioController.mostrarDadosFuncionario(req, res);
})

router.get(`/mostrarFoto/:idFuncionario`, function (req, res) {
    funcionarioController.mostrarFoto(req, res);
});

router.get(`/mostrarNome/:idFuncionario`, function (req,res){
    funcionarioController.mostrarNome(req,res);
});

module.exports = router;