var database = require("../database/config");

function kpiBandaLarga(codServidor){

  var instrucao = `SELECT * FROM vw_kpi_banda_larga WHERE codigo = '${codServidor}';`
  console.log("Executando a instrucao SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function kpiPacotesEnviados(codServidor){

  var instrucao = `SELECT * FROM vw_kpi_pacotes_enviados WHERE codigo = '${codServidor}';`
  console.log("Executando a instrucao SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function kpiPacotesRecebidos(codServidor){

  var instrucao = `SELECT * FROM vw_kpi_pacotes_recebidos WHERE codigo = '${codServidor}';`
  console.log("Executando a instrucao SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function kpiTaxaTransferencia(codServidor){

  var instrucao = `SELECT * FROM vw_kpi_taxa_transferencia WHERE codigo = '${codServidor}';`
  console.log("Executando a instrucao SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  kpiBandaLarga,
  kpiPacotesEnviados,
  kpiPacotesRecebidos,
  kpiTaxaTransferencia
}
