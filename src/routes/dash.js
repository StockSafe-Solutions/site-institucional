var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/kpiEspecifica/:codServidor", (req, res) => {
    dashController.kpiEspecifica(req, res);
})

router.get("/graficosEspecificos/:codServidor", (req, res) => {
    dashController.graficosEspecificos(req, res);
})

router.get("/kpiGeral", (req, res) => {
    dashController.kpiGeral(req, res);
})

router.get("/graficosGerais", (req, res) => {
    dashController.graficosGerais(req, res);
})

router.get("/listarRegistrosData/:data", (req, res) => {
    dashController.listarRegistrosData(req, res);
});
router.get("/listarRegistrosDataEspeficico/:codServidor/:data", (req, res) => {
    dashController.listarRegistrosDataEspeficico(req, res);
});

router.get("/ramLivreEspeficico/:codServidor", (req, res) => {
	dashController.ramLivreEspeficico(req, res);
});
router.get("/ramUsadoEspeficico/:codServidor", (req, res) => {
	dashController.ramUsadoEspeficico(req, res);
});

router.get("/horaRam/:codServidor", (req, res) => {
    dashController.horaRam(req, res);
})

router.get("/kpiRam/:codServidor", (req, res) => {
    dashController.kpiRam(req, res);
});

module.exports = router;