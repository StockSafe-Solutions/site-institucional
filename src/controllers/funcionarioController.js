var funcionarioModel = require("../models/funcionarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    if (email == undefined) {
        res.status(400).send("Seu email está indefinido");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha esta indefinida")
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
                        res.status(403).send("Email e/ou senha invalido(s)")
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo email")
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

function cadastrarFuncionario(req, res) {
    var email = req.body.emailServer;
    var nome = req.body.nomeServer;
    var dataNascimento = req.body.dataNascimentoServer;
    var funcao = req.body.funcaoServer;
    var senha = req.body.senhaServer

    funcionarioModel.cadastrarFuncionario(email, nome, dataNascimento, funcao, senha)
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


function pegarDadosFucionario(req, res) {
    var email = req.body.emailServer;
    var nome = req.body.nomeServer;
    var dataNascimento = req.body.dataNascimentoServer;
    var funcao = req.body.funcaoServer;
    var senha = req.body.senhaServer

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (dataNascimento == undefined) {
        res.status(400).send("Sua data de nascimento está indefinida!");
    } else if (funcao == undefined) {
        res.status(400).send("Sua função está indefinida!");
    } else {

        perfilEmpresaModel.pegarDadosFucionario(nome, email, senha, dataNascimento, funcao)
            .then(
                function (pegarDadosFucionario) {
                    console.log(`\nResultados encontrados: ${pegarDadosFucionario.length}`);
                    console.log(`Resultados: ${JSON.stringify(pegarDadosFucionario[0])}`); // transforma JSON em String

                    // if (resultadoAutenticar.length == 1) {
                    //     console.log(resultadoAutenticar[0]);
                    //     res.json(resultadoAutenticar[0])
                    //    console.log("Tá quase")
                    // } else if (resultadoAutenticar.length == 0) {
                    //     res.status(403).send("Email e/ou senha inválido(s)");
                    // } else {
                    //     res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    // }
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

function mostrarFoto(req, res) {
    var idUsuario = req.params.idFuncionario;

    funcionarioModel.mostrarFoto(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function mostrarNome(req,res){
    var idUsuario = req.params.idFuncionario;

    funcionarioModel.mostrarNome(idUsuario)
        .then(
            function (resultado){
                res.json(resultado);
            }
        )
        .catch(
            function (erro){
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}
module.exports = {
    cadastrarFuncionario,
    autenticar,
    enviarFoto,
    mostrarFoto,
    mostrarNome,
    pegarDadosFucionario,
    atualizarDadosFuncionario,
    atualizarSenhaFuncionario
    
}