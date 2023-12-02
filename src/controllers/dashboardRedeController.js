var dashboardRedeModel = require("../models/dashboardRedeModel");

function kpiBandaLarga(req, res){

  var codServidor = req.params.codServidor;

  if(codServidor == undefined){
    res.status(400).send("Undefined")
  }
  dashboardRedeModel.kpiBandaLarga(codServidor).then((resultado) => {
    if(resultado.length > 0){
      console.log(resultado);
      res.status(200).json(resultado[0][0])
    } else{
      res.status(404).send();
    }
  }).catch((error) => {
    console.log(error);
    console.log("Erro nas Dashboards\n", error.sqlMessage);
  })
}

function kpiPacotesEnviados(req, res){

  var codServidor = req.params.codServidor;

  if(codServidor == undefined){
    res.status(400).send("Undefined")
  }
  dashboardRedeModel.kpiPacotesEnviados(codServidor).then((resultado) => {
    if(resultado.length > 0){
      console.log(resultado);
      res.status(200).json(resultado[0][0])
    } else{
      res.status(404).send();
    }
  }).catch((error) => {
    console.log(error);
    console.log("Erro nas Dashboards\n", error.sqlMessage);
  })
}

function kpiPacotesRecebidos(req, res){

  var codServidor = req.params.codServidor;

  if(codServidor == undefined){
    res.status(400).send("Undefined")
  }
  dashboardRedeModel.kpiPacotesRecebidos(codServidor).then((resultado) => {
    if(resultado.length > 0){
      console.log(resultado);
      res.status(200).json(resultado[0][0])
    } else{
      res.status(404).send();
    }
  }).catch((error) => {
    console.log(error);
    console.log("Erro nas Dashboards\n", error.sqlMessage);
  })
}

function kpiTaxaTransferencia(req, res){

  var codServidor = req.params.codServidor;

  if(codServidor == undefined){
    res.status(400).send("Undefined")
  }
  dashboardRedeModel.kpiTaxaTransferencia(codServidor).then((resultado) => {
    if(resultado.length > 0){
      console.log(resultado);
      res.status(200).json(resultado[0][0])
    } else{
      res.status(404).send();
    }
  }).catch((error) => {
    console.log(error);
    console.log("Erro nas Dashboards\n", error.sqlMessage);
  })
}
