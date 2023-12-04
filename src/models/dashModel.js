var database = require("../database/config")

function kpiEspecifica(codServidor){
    var instrucao = `CALL sp_kpi_especifica(1, '${codServidor}');`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cpuEspecifico(codServidor){
    var instrucao = `SELECT * FROM vw_cpu 
        WHERE fk_servidor = 
            (SELECT id_servidor FROM tb_servidor WHERE codigo = '${codServidor}');`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ramEspecifico(codServidor){
    var instrucao = `SELECT * FROM vw_ram 
        WHERE fk_servidor = 
            (SELECT id_servidor FROM tb_servidor WHERE codigo = '${codServidor}');`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpiGeral(){
    var instrucao = `CALL sp_kpi_geral(1);`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cpuGeral(){
    var instrucao = `SELECT * FROM vw_cpu;`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ramGeral(){
    var instrucao = `SELECT * FROM vw_ram;`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




function info(nome_funcao, info_query) {
    console.log(`\n[KPI Model] ${nome_funcao} => ${info_query}`)
}

function buscarDados(select) {
    info("buscarDados", select)

    return database.executar(select)
}

function buscarGraficos() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `CALL dash_geral_erros(1);`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarGraficos,
    buscarDados,
    kpiEspecifica,
    cpuEspecifico,
    ramEspecifico,
    kpiGeral,
    cpuGeral,
    ramGeral
}