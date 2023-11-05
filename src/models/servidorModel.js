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

function cadastrar(codigo) {
  var instrucaoSql = `
    INSERT INTO tb_servidor
      (codigo)
      VALUES ('${codigo}')
  `
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  selecionar,
  cadastrar
}
