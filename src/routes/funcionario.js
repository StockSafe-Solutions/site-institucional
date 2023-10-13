var express = require("express")
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A COFIGURAÇÃO DO UP
var funcionarioController = require("../controllers/funcionarioController");


router.post('/autenticar', function (req, res) {
    funcionarioController.autenticar(req, res);
})

router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
});

router.get('/selecionar/:email', function (req, res) {
    funcionarioController.selecionar(req, res);
})

router.post('/enviarFoto/:idUsuario', upload.single('foto'), (req, res) => {
    funcionarioController.enviarFoto(req, res);
});

router.post('/atualizarDadosFuncionario/:idFuncionario', function (req, res) {
    funcionarioController.atualizarDadosFuncionario(req, res);
});

router.post('/atualizarSenhaFuncionario/:idUsuario', function (req, res) {
    funcionarioController.atualizarSenhaFuncionario(req, res);
});

module.exports = router;