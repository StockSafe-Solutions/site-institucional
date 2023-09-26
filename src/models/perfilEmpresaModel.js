var database = require("../database/config")

function pegarDadosEmpresa(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarDadosEmpresa(): ")
    var instrucao = `
    SELECT 
	    e.cnpj, 
	    u.email, 
	    u.senha 
	    FROM usuario AS u
        JOIN funcionario AS f
        JOIN empresa AS e
        WHERE fkFuncionario = idFuncionario
	        AND fkEmpresa = (SELECT fkEmpresa 
                                    FROM funcionario
                                    WHERE idFuncionario = ${idUsuario})
		    AND idFuncionario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarDados(senha, idUsuario) {
    console.log (`Senha: ${senha}`)
    var instrucao = `
        UPDATE usuario SET senha = '${senha}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    pegarDadosEmpresa,
    alterarDados 
};