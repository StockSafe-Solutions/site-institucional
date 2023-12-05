var dashboardModel = require("../models/dashModel");

function info(nome_funcao) {
  console.log(`\n[Kpi Controller] ${nome_funcao}`)
}

function buscarDados(req, res) {
    info("/buscarDados")
  
    var select = req.body.selectServer
    console.log(req.body)
  
    if (select == undefined) {
      res.status(400).send("Undefined")
    }
  
    dashboardModel.buscarDados(select).then((resultado) => {
      if (resultado.length > 0) {
        console.log(resultado)
        res.status(200).json(resultado)
      } else {
        res.status(204).json(resultado)
      }
    }
    ).catch((error) => {
      console.log(error)
      console.log("Erro nas Dashboards\n", erro.sqlMessage)
    }
    )
  }

  function buscarGraficos(req, res) {
    dashboardModel.buscarGraficos().then(function (novoRegistro) {
        if (novoRegistro.length > 0) {
            res.status(200).json(novoRegistro);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
    });
}





function kpiEspecifica(req, res) {
  var codServidor = req.params.codServidor;

  if (codServidor == undefined) {
    res.status(400).send("Undefined")
  }
  dashboardModel.kpiEspecifica(codServidor).then((resultado) => {
    if (resultado.length > 0) {
      console.log(resultado)
      res.status(200).json(resultado[0][0])
    } else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", error.sqlMessage)
  })
}

function graficosEspecificos(req, res) {
  var codServidor = req.params.codServidor

  if (codServidor == undefined) {
    res.status(400).send("Undefined")
  }
  dashboardModel.cpuEspecifico(codServidor).then((resultado1) => {
    if (resultado1.length > 0) {
      dashboardModel.ramEspecifico(codServidor).then((resultado2) => {
        if (resultado2.length > 0) {
          res.status(200).json([resultado1,resultado2])
        } else {
          res.status(404).send()
        }}).catch((error) => {
        console.log(error)
        console.log("Erro nas Dashboards\n", error.sqlMessage)
      })} else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", error.sqlMessage)
  })
}

function kpiGeral(req, res) {

  dashboardModel.kpiGeral().then((resultado) => {
    if (resultado.length > 0) {
      console.log(resultado)
      res.status(200).json(resultado[0][0])
    } else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", error.sqlMessage)
  })
}

function graficosGerais(req, res) {

  dashboardModel.cpuGeral().then((resultado1) => {
    if (resultado1.length > 0) {
      dashboardModel.ramGeral().then((resultado2) => {
        if (resultado2.length > 0) {
          res.status(200).json([resultado1,resultado2])
        } else {
          res.status(404).send()
        }}).catch((error) => {
        console.log(error)
        console.log("Erro nas Dashboards\n", error.sqlMessage)
      })} else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", error.sqlMessage)
  })

}

module.exports = {
    buscarGraficos,
    buscarDados,
    kpiEspecifica,
    graficosEspecificos,
    kpiGeral,
    graficosGerais
}
