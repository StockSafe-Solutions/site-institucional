var dashboardRedeModel = require("../models/redeModel");

function kpiBandaLarga(req, res){

  var codServidor = req.params.codServidor;

  if(codServidor == undefined){
    res.status(400).send("Undefined")
  }
  dashboardRedeModel.kpiBandaLarga(codServidor).then(function (resultado) {
    console.log(`\n Resultados encontrados: ${resultado.length}`);
           console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado) {
                ;
                res.json(resultado);
            } else {
                res.status(404).send()
            }
  }).catch(function (error) {
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
    console.log(`\n Resultados encontrados: ${resultado.length}`);
           console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado) {
                ;
                res.json(resultado);
            } else {
                res.status(404).send()
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
 console.log(`\n Resultados encontrados: ${resultado.length}`);
           console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado) {
                ;
                res.json(resultado);
            } else {
                res.status(404).send()
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
 console.log(`\n Resultados encontrados: ${resultado.length}`);
           console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado) {
                ;
                res.json(resultado);
            } else {
                res.status(404).send()
            }
  }).catch((error) => {
    console.log(error);
    console.log("Erro nas Dashboards\n", error.sqlMessage);
  })
}

function graficoBandaLarga(req, res) {
  var codServidor = req.params.codServidor;

  if (codServidor == undefined) {
    res.status(400).send("Undefined")
  }
  dashboardRedeModel.graficoBandaLarga(codServidor).then((resultado) => {
    console.log(`\n Resultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`);

      if (resultado) {
        ;
        res.json(resultado);
      } else {
        res.status(404).send()
      }
  }).catch((error) => {
    console.log(error);
    console.log("Erro nas Dashboards\n", error.sqlMessage);
  })
}

function graficoTaxaTransferencia(req, res) {
  var codServidor = req.params.codServidor;

  if (codServidor == undefined) {
    res.status(400).send("Undefined")
  }
  dashboardRedeModel.graficoTaxaTransferencia(codServidor).then((resultado) => {
    console.log(`\n Resultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`);

      if (resultado) {
        ;
        res.json(resultado);
      } else {
        res.status(404).send()
      }
  }).catch((error) => {
    console.log(error);
    console.log("Erro nas Dashboards\n", error.sqlMessage);
  })
}

module.exports = {
  kpiBandaLarga,
  kpiPacotesEnviados,
  kpiPacotesRecebidos,
  kpiTaxaTransferencia, 
  graficoBandaLarga,
  graficoTaxaTransferencia
}
