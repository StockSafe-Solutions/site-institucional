var express = require("express");
var router = express.Router();

var dashboardRedeController = require("../controllers/redeController")

router.get("/kpiBandaLarga/:codServidor", (req, res) => {
  dashboardRedeController.kpiBandaLarga(req, res);
})

router.get("/kpiPacotesEnviados/:codServidor", (req, res) => {
  dashboardRedeController.kpiPacotesEnviados(req, res);
})

router.get("/kpiPacotesRecebidos/:codServidor", (req, res) => {
  dashboardRedeController.kpiPacotesRecebidos(req, res);
})

router.get("/kpiTaxaTransferencia/:codServidor", (req, res) => {
  dashboardRedeController.kpiTaxaTransferencia(req, res);
})

router.get("/graficoBandaLarga/:codServidor", (req, res) => {
  dashboardRedeController.graficoBandaLarga(req, res);
})

router.get("/graficoTaxaTransferencia/:codServidor", (req, res) => {
  dashboardRedeController.graficoTaxaTransferencia(req, res);
})

module.exports = router;