var maquinasModel = require("../models/maquinasModel");


function cadastrar(req, res) {
  var nucleos = req.body.nucleosServer;
  var qtdProcessadoresLogicos = req.body.qtdProcessadoresLogicosServer;
  var ram = req.body.ramServer;
  var armazenamento = req.body.armazenamentoServer;
  // var cpuAtivo = req.body.cpuAtivoServer;
  // var ramAtivo = req.body.ramAtivoServer;
  // var discoAtivo = req.body.discoAtivoServer;

  
    maquinasModel.cadastrar(nucleos, qtdProcessadoresLogicos, ram, armazenamento)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  
}
function cadastrarComponentes(req, res) {
  var nomeComponente = req.body.nomeComponenteServer;
  var unidade = req.body.unidadeServer;
  // var cpuAtivo = req.body.cpuAtivoServer;
  // var ramAtivo = req.body.ramAtivoServer;
  // var discoAtivo = req.body.discoAtivoServer;
console.log("Controller novo")
console.log(unidade," ",nomeComponente)
  
    maquinasModel.cadastrarComponentes(nomeComponente, unidade)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  
}

module.exports = {
  cadastrar,
  cadastrarComponentes
}