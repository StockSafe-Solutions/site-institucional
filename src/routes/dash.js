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

router.get("/graficosEspecificosRAM/:codServidor", (req, res) => {
    console.log("Estou na rora")
	dashController.graficosEspecificosRAM(req, res);
});

module.exports = router;