var database = require("../database/config");

function listar(){
  var instrucaoSql = `
  SELECT
  s.*,
  COUNT(ts.fk_tag) as qtdTag
  FROM vw_servidor AS s
  LEFT JOIN tb_tag_servidor AS ts ON s.id_servidor = ts.fk_servidor
  GROUP BY
    s.id_servidor,
    s.codigo,
    s.armazenamento_total,
    s.armazenamento_usado,
    s.id_autenticador,
    s.ultimaData,
    s.ultimoHorario;
  `
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
