var servidorModel = require("../models/servidorModel");

function listar(req, res) {
  servidorModel.listar()
    .then(
      function (resultadoAutenticar) {
        console.log(`\n Resultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

        if (resultadoAutenticar.length > 0) {
          console.log(resultadoAutenticar);
          res.json(resultadoAutenticar);
        } else {
          res.status(204).send("Nenhum servidor cadastrado.")
        }
      }).catch(
        function (erro) {
          console.log(erro);
          console.log("\n Houve um erro ao realizar o login! Erro: ", erro.sqlMessage);
          res.status(500), json(erro.sqlMessage);
        }
      )
}

function selecionar(req, res) {
  var codigo = req.params.codigo;

  if (codigo == undefined) {
    res.status(400).send("Código vazio.");
  } else {
    servidorModel.selecionar(codigo)
      .then(
        function (resultadoAutenticar) {
          console.log(`\n Resultados encontrados: ${resultadoAutenticar.length}`);
          console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

          if (resultadoAutenticar.length > 0) {
            console.log(resultadoAutenticar);
            res.json(resultadoAutenticar);
          } else{
            res.status(204).send()
          }
        }).catch(
          function (erro) {
            console.log(erro);
            console.log("\n Houve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500), json(erro.sqlMessage);
          }
        )
  }
}

function cadastrar(req, res) {
  var codigo = req.body.codigoServer;

  servidorModel.cadastrar(codigo)
    .then((resultado) => {
      res.status(201).json(resultado);
    }
    ).catch((erro) => {
      console.log(erro);
      console.log(erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listar,
  selecionar,
  cadastrar
}