var database = require("../database/config")

function autenticar(email, senha) {
    var instrucao = `
    SELECT
	    u.email,
        u.senha,
        u.idUsuario,
        u.tipo,
        f.idFuncionario as id,
        f.nome,
        f.foto,
        e.cnpj,
        f.funcao,
        f.dataNascimento
    FROM
	    usuario AS u 
        JOIN empresa AS e
        JOIN funcionario AS f
        WHERE f.idFuncionario = u.fkFuncionario 
        AND e.idEmpresa = f.fkEmpresa
        AND email LIKE '${email}' 
	    AND senha LIKE '${senha}';
    `
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao);
}

function mostrarFoto(idUsuario) {
    var instrucao = `
    SELECT 
    foto
    FROM funcionario WHERE idFuncionario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

function mostrarNome(idUsuario){
    var instrucao = `
    SELECT 
        nome
    FROM funcionario WHERE idFuncionario = ${idUsuario}
    `
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

function cadastrarFuncionario(email, nome, dataNascimento, funcao, senha) {
    var instrucao = `
        CALL stockSafe.inserirFuncionario('${nome}','${funcao}','${dataNascimento}',5000,'${email}','${senha}');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function enviarFoto(imagem, idUsuario) {
    var instrucao = `
         UPDATE funcionario SET foto = '${imagem}' where idFuncionario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarDadosFucionario(nome, email, senha, funcao, dataNascimento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarDadosEmpresa(): ", cnpj, email, senha)
    var instrucao = `
    SELECT 
	    nome, 
	    email, 
	    senha,
        funcao,
        DATE_FORMAT(dataNascimento, '%d/%m/%Y')
	    FROM empresa 
	    WHERE nome LIKE ${nome}
        email LIKE '${email}' 
	    AND senha LIKE '${senha}'
        AND senha LIKE '${funcao}'
        AND senha LIKE '${dataNascimento}'
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarDadosFuncionario(nome, funcao, dataNascimento, idFuncionario) {
    var instrucao = `
        UPDATE funcionario SET nome = '${nome}', funcao = '${funcao}', dataNascimento = '${dataNascimento}'  where idFuncionario = ${idFuncionario};
    `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function atualizarSenhaFuncionario(senha, idUsuario) {
    var instrucao = `
    UPDATE usuario SET senha = '${senha}' where idUsuario = ${idUsuario};
    `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    cadastrarFuncionario,
    enviarFoto,
    autenticar,
    mostrarFoto,
    mostrarNome,
    pegarDadosFucionario,
    atualizarDadosFuncionario,
    atualizarSenhaFuncionario

};