var database = require("../database/config")

function listarProcessos(codServidor, orderByString){
    var instrucao = 
    `
    SELECT p.*,
    s.codigo
    FROM tb_processo AS p
    JOIN tb_servidor AS s 
    ON p.fk_servidor = s.id_servidor
    WHERE s.codigo = '${codServidor}' 
        AND p.data_hora >= DATEADD(MINUTE, -1, GETDATE())
    ${orderByString};
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
    SELECT TOP 5 p.nome_proc AS nome,
              COUNT(p.nome_proc) AS quantidade,
              s.codigo AS codigo
    FROM tb_processo AS p
    JOIN tb_servidor AS s ON p.fk_servidor = s.id_servidor
    WHERE s.codigo = '${codServidor}'
      AND CAST(p.data_hora AS DATE) = CAST(GETDATE() AS DATE)
    GROUP BY p.nome_proc, s.codigo
    ORDER BY quantidade DESC;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarProcessos,
    atualizarKpis,
    atualizarGraficoProc
}