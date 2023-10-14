var funcionarioModel = require("../models/funcionarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    if (email == undefined) {
        res.status(400).send("Email vazio.");
    } else if (senha == undefined) {
        res.status(400).send("Senha vazia.")
    } else {

        funcionarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\n Resultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar[0])}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar[0]);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(406).send("Email e/ou senha invalido(s)")
                    } else {
                        res.status(500).send("Erro no servidor do aplicativo. Contate seu administrador de TI.")
                    }
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\n Houve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500), json(erro.sqlMessage);
                }
            )
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var funcao = req.body.funcaoServer;
    var dataNasc = req.body.dataServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer

    funcionarioModel.cadastrar(nome, funcao, dataNasc, email, senha)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\n Houve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage)
            }
        );
}

// Dar uma olhada

function atualizarDadosFuncionario(req, res) {
    var nome = req.body.nomeServer;
    var dataNascimento = req.body.dataNascimentoServer;
    var funcao = req.body.funcaoServer;
    // var senha = req.body.senhaServer;
    var idFuncionario = req.params.idFuncionario;

    funcionarioModel.atualizarDadosFuncionario(nome, funcao,dataNascimento , idFuncionario)

        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\n Houve um erro ao atualizar os dados! Erro: ", erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage)
            }
        );
}

function atualizarSenhaFuncionario(req, res) {
    var idFuncionario = req.params.idUsuario
    var senha = req.body.senhaServer;
   

    funcionarioModel.atualizarSenhaFuncionario(senha, idFuncionario)

        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\n Houve um erro ao atualizar os dados! Erro: ", erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage)
            }
        );
}


function selecionar(req, res) {
    var email = req.params.email;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else {
        perfilEmpresaModel.selecionar(email)
            .then(
                function (pegarDadosFucionario) {
                    console.log(`\nResultados encontrados: ${pegarDadosFucionario.length}`);
                    console.log(`Resultados: ${JSON.stringify(pegarDadosFucionario[0])}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar[0]);
                        res.json(resultadoAutenticar[0])
                       console.log("Tá quase")
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo email!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a captura dos dados! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function enviarFoto(req, res) {
    const imagem = req.file.filename;
    const idUsuario = req.params.idUsuario
    funcionarioModel.enviarFoto(imagem, idUsuario)
        .then(resultado => {
            res.status(201).send("Usuario criado com sucesso");
        }).catch(err => {
            res.status(500).send(err);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    selecionar,
    enviarFoto,
    atualizarDadosFuncionario,
    atualizarSenhaFuncionario
}