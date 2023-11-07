var express = require("express")
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A COFIGURAÇÃO DO UPLOAD DE FOTOS
var funcionarioController = require("../controllers/funcionarioController");

router.get('/listar', function (req, res){
    funcionarioController.listar(req, res);
})

router.get('/selecionar/:id', function (req, res) {
    funcionarioController.selecionar(req, res);
})

router.post('/autenticar', function (req, res) {
    funcionarioController.autenticar(req, res);
})

router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
});

router.post("/enviarEmail", function(req, res){
    funcionarioController.enviarEmail(req,res)
});

router.put('/terminarCadastro/:id', function (req, res) {
    funcionarioController.terminarCadastro(req, res);
});

router.get('/solicitacoesFuncionarios', function(req, res){
    funcionarioController.solicitacoesFuncionarios(req, res);
})

router.post('/enviarFoto/:idUsuario', upload.single('foto'), (req, res) => {
    funcionarioController.enviarFoto(req, res);
});

router.put('/alterar/:idFuncionario', function (req, res) {
    funcionarioController.alterar(req, res);
});

router.put('/alterarSenha/:idFuncionario', function (req, res) {
    funcionarioController.alterarSenha(req, res);
});

router.delete('/deletarSolicitacoes/:idFuncionario', function(req, res){
    funcionarioController.deletarSolicitacoes(req, res);
})

module.exports = router;