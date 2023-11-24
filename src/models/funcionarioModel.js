var database = require("../database/config");
var nodemailer = require("nodemailer");

function listar() {
	var instrucao = `SELECT id_funcionario, nome, email, senha, funcao, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as dtNasc
	FROM tb_funcionario WHERE nome != "null"`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function selecionar(id) {
	var instrucao = `
    SELECT id_funcionario, nome, email, senha, funcao, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as dtNasc
	FROM tb_funcionario
    WHERE id_funcionario = '${id}'`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function autenticar(email, senha) {
	var instrucao = `
    SELECT *
    FROM tb_funcionario
    WHERE email = '${email}' AND senha = '${senha}'`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function cadastrar(nome, funcao, dataNasc, email, senha) {
	var instrucao = `
    INSERT INTO tb_funcionario
    VALUES (null,'${nome}','${funcao}','${dataNasc}',null,'${email}','${senha}')`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function enviarFoto(imagem, idUsuario) {
	var instrucao = `
         UPDATE funcionario SET foto = '${imagem}' where idFuncionario = ${idUsuario};`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function alterar(id, nome, data, email) {
	var instrucao = `
        UPDATE tb_funcionario SET nome = '${nome}', data_nascimento = '${data}',
            email = '${email}'
            WHERE id_funcionario = ${id};`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function alterarSenha(senha, idUsuario) {
	var instrucao = `
    UPDATE usuario SET senha = '${senha}' where idUsuario = ${idUsuario};`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function enviarEmail(email, funcao) {
	var senha = Math.floor(Math.random() * 1000000);

	var transporter = nodemailer.createTransport({
		service: "outlook",
		auth: {
			user: "Stock.safe@outlook.com",
			pass: "urubu100",
		},
	});

	var mailOptions = {
		from: "stephany.justino@sptech.school",
		to: email,
		subject: "Você foi convocado para Stocksafe",
		text: `
    Seja bem - vindo.
    http://localhost:3333/dashboard/testeFormColaborador.html
     `,
		html: `
    <!DOCTYPE html>
      <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Seja bem - vindo</title>
      </head>
      <body>
        <h1>Para acessar</h1>
        <p>É um prazer ter você conosco! Seja bem-vindo à nossa comunidade.</p>
        <p>Para aproveitar ao máximo sua experiência, pedimos que complete seu cadastro clicando no link abaixo:</p>
        <a href="http://localhost:3333/dashboard/testeFormColaborador.html">Complete Seu Cadastro</a>
    
        <p>Estamos ansiosos para tê-lo totalmente integrado à nossa plataforma. Se precisar de assistência ou tiver alguma dúvida,
          não hesite em entrar em contato conosco.</p>
    
        <p>Obrigado por fazer parte da nossa comunidade!</p>
        <p>Email de login: ${email}</p>
        <p>Senha: ${senha}</p>
    
        <p>Atenciosamente,</p>
        <p>Stocksafe<p>
      </body>
    </html>
    `,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("Deu algo de errado! 🤦🏽‍♂️: " + error);
		} else {
			console.log("Email foi enviado com sucesso! 🩵: " + info.response);
		}
	});

	var instrucao = `
    INSERT INTO tb_funcionario(email, funcao, senha)
    VALUES ('${email}','${funcao}', '${senha}')`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function terminarCadastro(id, nome, dataNascimeto, senha) {
	var instrucao = `
    UPDATE tb_funcionario SET nome = '${nome}', data_nascimento = '${dataNascimeto}',
        senha = '${senha}'
        WHERE id_funcionario = ${id};`;
	console.log("Executando a instrução SQL: \n" + instrucao);
	return database.executar(instrucao);
}

function solicitacoesFuncionarios() {
	const instrucao = `
    SELECT * FROM tb_funcionario WHERE nome IS NULL;
  `;
	console.log(`Executanto a instrução SQL: \n ${instrucao}`);
	return database.executar(instrucao);
}

function deletarSolicitacoes(id) {
	const instrucao = `
  DELETE FROM tb_funcionario WHERE id_funcionario = ${id};
  `;
	console.log(`Executando a instrução SQL: \n ${instrucao}`);
	return database.executar(instrucao);
}

function contarSolicitacoes(){
	const instrucao = `
		SELECT COUNT(*) AS qtd_nomes_nulos
		FROM tb_funcionario
		WHERE nome IS NULL;
  `;
	console.log(`Executanto a instrução SQL: \n ${instrucao}`);
	return database.executar(instrucao);
}

function contarFuncionarios() {
	const instrucao = `
		SELECT COUNT(*) AS qtd_nomes
		FROM tb_funcionario
		WHERE nome IS NOT NULL;
  `;
	console.log(`Executanto a instrução SQL: \n ${instrucao}`);
	return database.executar(instrucao);
}

function contarCargos() {
	const instrucao = `
		SELECT funcao, COUNT(*) AS qtd
		FROM tb_funcionario
		GROUP BY funcao
		ORDER BY qtd DESC
  `;
	console.log(`Executanto a instrução SQL: \n ${instrucao}`);
	return database.executar(instrucao);
}
module.exports = {
	listar,
	selecionar,
	autenticar,
	cadastrar,
	enviarFoto,
	alterar,
	alterarSenha,
	enviarEmail,
	terminarCadastro,
	solicitacoesFuncionarios,
	deletarSolicitacoes,
	contarSolicitacoes,
	contarFuncionarios,
	contarCargos
};
