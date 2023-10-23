var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

function info(nome_rota) {
    console.log(`\n[Dashboard routers] ${nome_rota}`)
}

router.post("/listarDados", (req, res) => {
    info("/listarDados");
    dashboardController.buscarDados(req, res);
})


module.exports = router;