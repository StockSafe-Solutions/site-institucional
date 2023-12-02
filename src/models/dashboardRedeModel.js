var database = require("../database/config");

function kpiBandaLarga(codServidor){

  var instrucao = `SELECT * FROM vw_banda_larga WHERE fk_servidor = '${codServidor}';`
  console.log("Executando a instrucao SQL: a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n a\n" + instrucao);
  return database.executar(instrucao);
}

function kpiPacotesEnviados(codServidor){

  var instrucao = `SELECT * FROM vw_pacotes_enviados WHERE fk_servidor = '${codServidor}';`
  console.log("Executando a instrucao SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function kpiPacotesRecebidos(codServidor){

  var instrucao = `SELECT * FROM vw_pacotes_recebidos WHERE fk_servidor = '${codServidor}';`
  console.log("Executando a instrucao SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function kpiTaxaTransferencia(codServidor){

  var instrucao = `SELECT * FROM vw_taxa_transferencia WHERE fk_servidor = '${codServidor}';`
  console.log("Executando a instrucao SQL: \n" + instrucao);
  return database.executar(instrucao);
}
