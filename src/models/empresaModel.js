var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(razao, email, telefone,nomeFantasia, cnpj, senha, rua, numero, bairro, cep) {

  var query = `
        CALL stockSafe.inserirEmpresa('${razao}','${telefone}','${cnpj}','${nomeFantasia}','Analista','${email}','${senha}','${rua}',
        ${numero}, '${bairro}', '${cep}');
  `

  return database.executar(query);
}


module.exports = { 
  buscarPorCnpj,
  buscarPorId,
  cadastrar, 
  listar 
};
