-- Active: 1683844384427@@127.0.0.1@3306@stocksafe
-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE stockSafe;
-- DROP DATABASE stockSafe;
USE stockSafe;

CREATE TABLE empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	razao VARCHAR(50),	
	email VARCHAR(50),
	telefone CHAR(12),
	cnpj CHAR(14),
	senha VARCHAR(25)
);
SELECT 
	idEmpresa, 
	email, 
	senha 
	FROM empresa 
	WHERE email LIKE 'bechis@gmail.com' 
	AND senha LIKE '123456';
INSERT into empresa VALUES (NULL, 'Teste', 'empresa@gmail.com', '123654789654', '12345678965432','mmmmmm');
CREATE TABLE endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
	rua VARCHAR(50),
	numero INT,
	bairro VARCHAR(30),
	complemento VARCHAR(30),
	cep CHAR(8),
	fkEndereco INT,
	Foreign Key (fkEndereco) REFERENCES empresa(idEmpresa)
);
SELECT * FROM endereco;
SELECT * FROM empresa;
INSERT INTO endereco (idEndereco, rua, numero, bairro, cep, fkEndereco) VALUES (NULL, 'Apostolo teste', 12, 'eldoralo', '12365478',(SELECT idEmpresa 
      FROM empresa 
      WHERE razao LIKE 'teste')
    );

SELECT * FROM mysql.user;
	
SELECT * FROM funcionario;
SELECT * FROM funcionario;
SELECT 
	idFuncionario,
	nome,
	funcao,
	foto,
	senha,
	email
 FROM
	funcionario WHERE 
	email LIKE 'henrique@gmail.com' 
	AND senha LIKE '123456';
/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

-- CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
-- WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
-- DEFAULT_SCHEMA = dbo;

-- EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

-- EXEC sys.sp_addrolemember @rolename = N'db_datareader',
-- @membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
