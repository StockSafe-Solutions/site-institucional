var dashboardModel = require("../models/dashModel");

function kpiEspecifica(req, res) {
  var codServidor = req.params.codServidor

  if (codServidor == undefined) {
    res.status(400).send("Undefined")
  }
  dashboardModel.kpiEspecifica(codServidor).then((resultado) => {
    if (resultado.length > 0) {
      console.log(resultado)
      res.status(200).json(resultado[0][0])
    } else {
      res.status(404).send()
    }
  }).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", erro.sqlMessage)
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
        console.log("Erro nas Dashboards\n", erro.sqlMessage)
      })} else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", erro.sqlMessage)
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
        console.log("Erro nas Dashboards\n", erro.sqlMessage)
      })} else {
      res.status(404).send()
    }}).catch((error) => {
    console.log(error)
    console.log("Erro nas Dashboards\n", erro.sqlMessage)
  })
}

module.exports = {
    kpiEspecifica,
    graficosEspecificos,
    graficosGerais
}