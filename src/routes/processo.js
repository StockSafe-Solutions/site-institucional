var express = require("express");
var router = express.Router();

var processoController = require("../controllers/processoController");

router.get("/listarProcessos", function(req,res){
    processoController.listarProcessos(req, res);
})

module.exports = router;