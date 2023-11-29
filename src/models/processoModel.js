var database = require("../database/config")

function listarProcessos(){
    var instrucao = `SELECT *
    FROM tb_processo
    ORDER BY nome_proc;`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarKpis(){
    console.log("To no model");
    var instrucao = `SELECT * FROM vw_proc_kpi;`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarProcessos,
    atualizarKpis
}