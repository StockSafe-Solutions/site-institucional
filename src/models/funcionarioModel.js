var database = require("../database/config");
var nodemailer = require("nodemailer");

function listar() {
  var instrucao = `SELECT nome, email, senha, funcao, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as dtNasc
	FROM tb_funcionario`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function selecionar(id) {
  var instrucao = `
    SELECT nome, email, senha, funcao, DATE_FORMAT(data_nascimento, '%d/%m/%Y') as dtNasc
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

function alterar(id, nome, funcao, data, email) {
  var instrucao = `
        UPDATE tb_funcionario SET nome = '${nome}', funcao = '${funcao}', data_nascimento = '${data}',
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
  var transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "stephany.justino@sptech.school",
      pass: "#Gf24007915890",
    },
  });

  var mailOptions = {
    from: "stephany.justino@sptech.school",
    to: email,
    subject: "Enviado email com node js. TESTE ",
    text: `
    Seja bem - vindo. 
    http://localhost:3333/dashboard/testeFormColaborador.html
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
    INSERT INTO tb_funcionario(email, funcao)
    VALUES ('${funcao}','${email}')`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function terminarCadastro(id, nome, dataNascimeto, senha){
    var instrucao = `
    UPDATE tb_funcionario SET nome = '${nome}', data_nascimento = '${dataNascimeto}',
        senha = '${senha}'
        WHERE id_funcionario = ${id};`;
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
  alterarSenha,
  enviarEmail,
  terminarCadastro
};
