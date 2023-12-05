var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

// dash erros

function info(nome_rota) {
    console.log(`\n[KPI routers] ${nome_rota}`)
}

router.get("/listarGraficos", (req, res) => {
    dashController.buscarGraficos(req, res);
})

router.post("/listarDados", (req, res) => {
    info("/listarDados")
    dashController.buscarDados(req, res);

// geral
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
})

module.exports = router;