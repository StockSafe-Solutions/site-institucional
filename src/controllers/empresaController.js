var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  
  var razao = req.body.razaoServer
  var email = req.body.emailServer;
  var telefone = req.body.telefoneServer;
  var cnpj = req.body.cnpjServer;
  var senha = req.body.senhaServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var rua = req.body.ruaServer;
  var numero = req.body.numeroServer;
  var bairro = req.body.bairroServer;
  var cep = req.body.cepServer;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razao,email,telefone,nomeFantasia, cnpj, senha, rua, numero, bairro, cep).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
