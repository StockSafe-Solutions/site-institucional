var database = require("../database/config")

function listarProcessos(codServidor){
    var instrucao = 
    `
    SELECT proc.*,
    serv.codigo
    FROM tb_processo AS proc
    JOIN tb_servidor AS serv 
    ON proc.fk_servidor = serv.id_servidor
    WHERE serv.codigo = '${codServidor}' 
    AND data_hora >= NOW() - INTERVAL 1 MINUTE
    ORDER BY proc.nome_proc;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarKpis(codServidor){
    var instrucao = 
    `
    SELECT * 
    FROM vw_proc_kpi
    WHERE codigo = '${codServidor}';
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarGraficoProc(codServidor){
    var instrucao = 
    `
    SELECT proc.nome_proc AS nome, 
    COUNT(proc.nome_proc) AS quantidade,
    serv.codigo AS codigo
    FROM tb_processo AS proc
    JOIN tb_servidor AS serv
    ON proc.fk_servidor = serv.id_servidor
    WHERE codigo = '${codServidor}'
    AND DATE(proc.data_hora) = CURDATE()
    GROUP BY nome_proc,
    codigo
    ORDER BY quantidade DESC LIMIT 5;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarProcessos,
    atualizarKpis,
    atualizarGraficoProc
}