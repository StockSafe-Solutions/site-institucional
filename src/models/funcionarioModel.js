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
			user: "stephany.justino@sptech.school",
			pass: "#Gf4902237",
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
  <title>Seja bem-vindo</title>

  <style>
    body {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  margin-bottom: 15px;
}

a {
  color: #005EFF;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

a:hover {
  color: #001A46;
}

header {
  background-color: #005EFF;
  color: #fff;
  padding: 20px 0;
  border-bottom: 1px solid #001A46;
  text-align: center;
}

main {
  padding: 30px 20px;
  background-color: #fff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

footer {
  background-color: #005EFF;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.btn {
   display: inline-block;
  background-color: #005EFF;
  color: #fff;
  padding: 12px 24px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Adiciona box-shadow padrão */

}

.btn:hover {
  background-color: #001A46;
  color: #fff;
   box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.43);
}



  </style>
</head>

<body>

  <header>
    <div class="container">
      <h1>Seja bem-vindo 👋</h1>
    </div>
  </header>

  <main>
    <div class="container">
      <p>É um prazer ter você conosco! Seja bem-vindo à nossa comunidade.</p>
      <p>Para aproveitar ao máximo sua experiência, pedimos que complete seu cadastro clicando no link abaixo:</p>
      <a href="http://localhost:3333/dashboard/testeFormColaborador.html" class="btn">Complete Seu Cadastro</a>

      <p>Estamos ansiosos para tê-lo totalmente integrado à nossa plataforma. Se precisar de assistência ou tiver alguma
        dúvida,
        não hesite em entrar em contato conosco.</p>

      <p>Obrigado por fazer parte da nossa comunidade!</p>
      <p>Email de login: ${email}</p>
      <p>Senha: ${senha}</p>

      <p>Atenciosamente,</p>
      <p><b>Stocksafe</b></p>
    </div>
  </main>

  <footer>
    <div class="container">
      <p>Copyright © 2023 Stocksafe</p>
    </div>
  </footer>

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

function contarSolicitacoes() {
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
	contarCargos,
};
