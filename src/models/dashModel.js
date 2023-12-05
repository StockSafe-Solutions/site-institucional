var database = require("../database/config");

function kpiRam(codServidor) {
	const instrucao = `
	SELECT TOP 1 DATEPART(MINUTE, data_hora) AS dataDados,
  ROUND(AVG(uso_da_ram), 0) AS avgUsoRam,
  ROUND(AVG(ram_livre), 0) AS avgUsoDisponivelRam,
  ROUND(AVG(total_da_ram), 0) AS avgTotalRam
FROM vw_registro
WHERE fk_servidor = (
    SELECT id_servidor
    FROM tb_servidor
    WHERE codigo = '${codServidor}'
  )
GROUP BY DATEPART(MINUTE, data_hora)
ORDER BY dataDados DESC;`;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function kpiEspecifica(codServidor) {
	var instrucao = `
	SELECT
		AVG(taxt.taxa_de_transferencia) AS kpi_taxa,
		SUM(pct.pacotes_enviados) AS kpi_pacotes_enviados,
		SUM((s.armazenamento_usado * 100.0) / s.armazenamento_total) AS kpi_armazenamento,
		SUM(s.armazenamento_total) AS base_armazenamento
	FROM tb_servidor s
	JOIN vw_taxa_de_transferencia taxt ON taxt.fk_servidor = s.id_servidor
	JOIN vw_pacotes_enviados pct ON pct.fk_servidor = s.id_servidor
	WHERE s.codigo = '${codServidor}'`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}
function listarRegistrosData(data) {
	var instrucao = `SELECT * FROM vw_registro WHERE data_hora LIKE '%${data}%'`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function listarRegistrosDataEspeficico(codServidor, data) {
	var instrucao = `SELECT *
	FROM vw_registro
	WHERE fk_servidor = (
		SELECT id_servidor
		FROM tb_servidor
		WHERE codigo = '${codServidor}'
	  )
	  and data_hora LIKE '%${data}%';`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function cpuEspecifico(codServidor) {
	var instrucao = `SELECT * FROM vw_cpu 
        WHERE fk_servidor = 
            (SELECT id_servidor FROM tb_servidor WHERE codigo = '${codServidor}') ORDER BY dataDados ASC;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function ramEspecifico(codServidor) {
	var instrucao = `SELECT *
	FROM vw_ram
	WHERE fk_servidor = (
		SELECT id_servidor
		FROM tb_servidor
		WHERE codigo = '${codServidor}'
	  )
	ORDER BY dataDados ASC;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function ramUsadaEspeficico(codServidor) {
	const instrucao = `SELECT TOP 1 *
	FROM vw_ram
	WHERE fk_servidor = (
		SELECT id_servidor
		FROM tb_servidor
		WHERE codigo = '${codServidor}'
	  )
	ORDER BY dataDados DESC;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function ramLivreEspeficico(codServidor) {
	const instrucao = `SELECT TOP 1 *
	FROM vw_ram_livre
	WHERE fk_servidor = (
		SELECT id_servidor
		FROM tb_servidor
		WHERE codigo = '${codServidor}'
	  )
	AND ram_livre  IS NOT NULL
	ORDER BY dataDados DESC;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function horaRam(codServidor) {
	const instrucao = `SELECT dataDados AS Dia,
	DATEPART(MINUTE, dataDados) AS Minutos
  FROM vw_ram
  WHERE fk_servidor = (
	  SELECT id_servidor
	  FROM tb_servidor
	  WHERE codigo = '${codServidor}'
	);`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function kpiGeral() {
	var instrucao = `
	SELECT
		AVG(taxt.taxa_de_transferencia) AS kpi_taxa,
		SUM(pct.pacotes_enviados) AS kpi_pacotes_enviados,
		SUM((s.armazenamento_usado * 100.0) / s.armazenamento_total) AS kpi_armazenamento,
		SUM(s.armazenamento_total) AS base_armazenamento
	FROM tb_servidor s
	JOIN vw_taxa_de_transferencia taxt ON taxt.fk_servidor = s.id_servidor
	JOIN vw_pacotes_enviados pct ON pct.fk_servidor = s.id_servidor`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function cpuGeral() {
	var instrucao = `SELECT * FROM vw_cpu;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function ramGeral() {
	var instrucao = `SELECT * FROM vw_ram;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function csvRam(codServidor, data) {
	const instrucao = `SELECT FORMAT(data_hora, 'yyyy-MM-dd hh:mm') AS dataDados,
	ROUND(AVG(uso_da_ram), 0) AS avgUsoRam,
	ROUND(AVG(ram_livre), 0) AS avgUsoDisponivelRam,
	ROUND(AVG(total_da_ram), 0) AS avgUsoTotalRam
  FROM vw_registro
  WHERE fk_servidor = (
	  SELECT id_servidor
	  FROM tb_servidor
	  WHERE codigo = '${codServidor}'
	)
	AND CONVERT(VARCHAR, data_hora, 120) LIKE '%${data}%'
  GROUP BY FORMAT(data_hora, 'yyyy-MM-dd hh:mm')
  ORDER BY dataDados;`;
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
	ramGeral,
	listarRegistrosData,
	listarRegistrosDataEspeficico,
	ramUsadaEspeficico,
	ramLivreEspeficico,
	horaRam,
	kpiRam,
	csvRam
};
