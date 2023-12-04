var database = require("../database/config");

function kpiRam(codServidor) {
	const instrucao = `
	SELECT TOP 1 
		DATEPART(MINUTE, data_hora) AS dataDados,
		ROUND(AVG(uso_da_ram), 0) AS avgUsoRam,
		ROUND(AVG(ram_livre), 0) AS avgUsoDisponivelRam,
		ROUND(AVG(total_da_ram), 0) AS avgTotalRam
	FROM vw_registro
	WHERE fk_servidor = (
		SELECT id_servidor
		FROM tb_servidor
		WHERE codigo = 'SVJW32'
	)
	GROUP BY DATEPART(MINUTE, data_hora)
	ORDER BY dataDados DESC;`;

	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function kpiEspecifica(codServidor) {
	var instrucao = `CALL sp_kpi_especifica(1, '${codServidor}');`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}
function listarRegistrosData(data) {
	var instrucao = `SELECT * FROM vw_registro WHERE data_hora LIKE '%${data}%'`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function listarRegistrosDataEspeficico(codServidor, data) {
	var instrucao = `SELECT * FROM vw_registro WHERE fk_servidor = (SELECT id_servidor FROM tb_servidor WHERE codigo = '${codServidor}')
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
	var instrucao = `SELECT * FROM vw_ram 
        WHERE fk_servidor = 
            (SELECT id_servidor FROM tb_servidor WHERE codigo = '${codServidor}') ORDER BY dataDados ASC;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function ramUsadaEspeficico(codServidor) {
	const instrucao = `SELECT * FROM vw_ram WHERE fk_servidor
     = (SELECT id_servidor FROM tb_servidor WHERE codigo = '${codServidor}' ) ORDER BY dataDados DESC LIMIT 1;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function ramLivreEspeficico(codServidor) {
	const instrucao = `SELECT * FROM vw_ram_livre WHERE fk_servidor = 
    (SELECT id_servidor FROM tb_servidor WHERE codigo = '${codServidor}' ) ORDER BY dataDados DESC LIMIT 1;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function horaRam(codServidor) {
	const instrucao = `SELECT dataDados AS Dia, MINUTE(dataDados) AS Minutos
	FROM vw_ram WHERE fk_servidor = (SELECT id_servidor FROM tb_servidor WHERE codigo = '${codServidor}');`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function kpiGeral() {
	var instrucao = `CALL sp_kpi_geral(1);`;
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
	const instrucao = `SELECT FORMAT(data_hora, '%Y-%m-%d %h:%i') AS dataDados,
       ROUND(AVG(uso_da_ram)) AS avgUsoRam,
       ROUND(AVG(uso_disponivel_da_ram)) AS avgUsoDisponivelRam,
       ROUND(AVG(total_da_ram)) AS avgUsoTotalRam
				FROM vw_registro
				WHERE fk_servidor = (SELECT id_servidor FROM tb_servidor WHERE codigo = '${codServidor}')
     		and data_hora LIKE '%${data}%'
				GROUP BY FORMAT(data_hora, '%Y-%m-%d %h:%i')
				ORDER BY dataDados;`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

module.exports = {
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
