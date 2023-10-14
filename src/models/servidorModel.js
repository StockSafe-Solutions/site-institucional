var database = require("../database/config");

function listar(){
  var instrucaoSql = "SELECT * FROM vw_servidor"
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function selecionar(codigo){
  var instrucaoSql = `
  SELECT * FROM vw_servidor
  WHERE codigo LIKE '%${codigo}%'`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(codigo, armazenamento, autenticador) {
  var instrucaoSql = `
    INSERT INTO tb_servidor
    VALUES(null, ${codigo},${armazenamento},0,${autenticador})
  `
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  selecionar,
  cadastrar
}
