var database = require("../database/config")

function listar(){
    var instrucao = `SELECT nome, email, senha, funcao, DATE_FORMAT(data_nascimento, '%d/%m/%Y')
	FROM tb_funcionario`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selecionar(email) {
    var instrucao = `
    SELECT nome, email, senha, funcao, DATE_FORMAT(data_nascimento, '%d/%m/%Y')
	FROM tb_funcionario
    WHERE email = '${email}'`
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

function atualizarDadosFuncionario(nome, funcao, dataNascimento, idFuncionario) {
    var instrucao = `
        UPDATE funcionario SET nome = '${nome}', funcao = '${funcao}', dataNascimento = '${dataNascimento}'  where idFuncionario = ${idFuncionario};`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarSenhaFuncionario(senha, idUsuario) {
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
    atualizarDadosFuncionario,
    atualizarSenhaFuncionario
};