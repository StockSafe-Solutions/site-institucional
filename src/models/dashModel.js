var database = require("../database/config");

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

function horaRam(codServidor){
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
	horaRam
};
