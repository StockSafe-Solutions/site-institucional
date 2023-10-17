var database = require("../database/config")

function listar(){
    var instrucao = `SELECT nome, email, senha, funcao, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as dtNasc
	FROM tb_funcionario`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selecionar(id) {
    var instrucao = `
    SELECT nome, email, senha, funcao, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as dtNasc
	FROM tb_funcionario
    WHERE id_funcionario = '${id}'`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(email, senha) {
    var instrucao = `
    SELECT *
    FROM tb_funcionario
    WHERE email = '${email}' AND senha = '${senha}'`
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao);
}

function cadastrar(nome, funcao, dataNasc, email, senha) {
    var instrucao = `
    INSERT INTO tb_funcionario
    VALUES (null,'${nome}','${funcao}','${dataNasc}',null,'${email}','${senha}')`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function enviarFoto(imagem, idUsuario) {
    var instrucao = `
         UPDATE funcionario SET foto = '${imagem}' where idFuncionario = ${idUsuario};`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterar(id, nome, funcao, data, email) {
    var instrucao = `
        UPDATE tb_funcionario SET nome = '${nome}', funcao = '${funcao}', data_nascimento = '${data}',
            email = '${email}'
            WHERE id_funcionario = ${id};`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarSenha(senha, idUsuario) {
    var instrucao = `
    UPDATE usuario SET senha = '${senha}' where idUsuario = ${idUsuario};`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    selecionar,
    autenticar,
    cadastrar,
    enviarFoto,
    alterar,
    alterarSenha
};