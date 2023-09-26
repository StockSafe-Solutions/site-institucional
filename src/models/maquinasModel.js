var database = require("../database/config");



function cadastrar(nucleos, qtdProcessadoresLogicos, ram, armazenamento) {
  
  var instrucaoSql = `insert into maquina (idMaquina, qtdNucleos, processadoresLogicos, qtdMemoriaRam, armazenamento) values (null,${nucleos}, ${qtdProcessadoresLogicos}, ${ram}, ${armazenamento});`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarComponentes(nomeComponente, unidade) {
  
  var instrucaoSql = `insert into componente (idComponente, descricao,unidadeMedida) values (null,'${nomeComponente}','${unidade}');`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  cadastrar,
  cadastrarComponentes
}
