var database = require("../database/config")

function listarAlertas(){
    var instrucao = `SELECT * FROM tb_alerta`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarAlertas
}