var database = require("../database/config")

function listarProcessos(codServidor){
    var instrucao = `SELECT proc.*,
    serv.codigo
    FROM tb_processo as proc
    JOIN tb_servidor as serv
    ON proc.fk_servidor = serv.id_servidor
    WHERE serv.codigo = '${codServidor}'
    ORDER BY nome_proc;`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarKpis(codServidor){
    var instrucao = `SELECT * 
    FROM vw_proc_kpi
    WHERE codigo = '${codServidor}';`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarProcessos,
    atualizarKpis
}