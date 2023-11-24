var funcionarioModel = require("../models/funcionarioModel");

function listar(req, res) {
    funcionarioModel.listar().then(
        function (resultadoAutenticar) {
            console.log(`\n Resultados encontrados: ${resultadoAutenticar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

            if (resultadoAutenticar.length > 0) {
                console.log(resultadoAutenticar);
                res.json(resultadoAutenticar);
            } else {
                res.status(204).send()
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("\n Houve um erro ao carregar funcionários! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function selecionar(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).send("ID vazio.");
    } else {
        funcionarioModel.selecionar(id)
            .then(
                function (pegarDadosFucionario) {
                    console.log(`\nResultados encontrados: ${pegarDadosFucionario.length}`);
                    console.log(`Resultados: ${JSON.stringify(pegarDadosFucionario[0])}`); // transforma JSON em String

                    if (pegarDadosFucionario.length == 1) {
                        console.log(pegarDadosFucionario[0]);
                        res.json(pegarDadosFucionario[0])
                    } else{
                        res.status(403).send("Usuário não encontrado");
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
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}
function enviarEmail(req, res){
    var email = req.body.emailServer;
    var funcao = req.body.funcaoServer;
    if(email==undefined){
        res.status(400).send("Email está vazio, digite um email do colaborador");
    }else if(funcao == undefined){
        res.status(400).send("O cargo está vazio, digite o cargo do colaborador")
    }else{
        funcionarioModel.enviarEmail(email, funcao).then(
            function(resultado){
                res.json(resultado)
            }
        ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\n Houve um erro ao enviar email! Erro: ", erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
        )
    }
}

function terminarCadastro(req, res){
    const id = req.body.idServer;
    const nome = req.body.nomeServer;
    const dataNascimeto = req.body.dataServer;
    const senha = req.body.senhaServer;
    console.log({id,params:req.params});
    funcionarioModel.terminarCadastro(id, nome, dataNascimeto, senha)
    .then(
        function (resultado){
            res.json(resultado)
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
function enviarEmail(req, res){
    var email = req.body.emailServer;
    var funcao = req.body.funcaoServer;
    if(email==undefined){
        res.status(400).send("Email está vazio, digite um email do colaborador");
    }else if(funcao == undefined){
        res.status(400).send("O cargo está vazio, digite o cargo do colaborador")
    }else{
        funcionarioModel.enviarEmail(email, funcao).then(
            function(resultado){
                res.json(resultado)
            }
        ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\n Houve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
        )
    }
}

function terminarCadastro(req, res){
    const id = req.body.idServer;
    const nome = req.body.nomeServer;
    const dataNascimeto = req.body.dataServer;
    const senha = req.body.senhaServer;
    console.log({id,params:req.params});
    funcionarioModel.terminarCadastro(id, nome, dataNascimeto, senha)
    .then(
        function (resultado){
            res.json(resultado)
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

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var funcao = req.body.funcaoServer;
    var dataNasc = req.body.dataServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

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

function alterar(req, res) {
    var id = req.body.idServer;
    var nome = req.body.nomeServer;
    var data = req.body.dataServer;
    var email = req.body.emailServer;

    funcionarioModel.alterar(id, nome, data, email)
    .then(
        function (resultado) {
            res.json(resultado);
        }).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\n Houve um erro ao atualizar os dados! Erro: ", erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage)
    });
}

function alterarSenha(req, res) {
    var idFuncionario = req.params.idFuncionario
    var senha = req.body.senhaServer;
    funcionarioModel.alterarSenha(senha, idFuncionario)
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


function solicitacoesFuncionarios(req, res) {
    funcionarioModel.solicitacoesFuncionarios().then(
       function(resultadoAutenticar){
        console.log(`Resultados encontrados: ${solicitacoesFuncionarios.length}`);
        console.log(`Resultados: ${JSON.stringify(solicitacoesFuncionarios)}`);

        if(solicitacoesFuncionarios.length >0){
            console.log(resultadoAutenticar);
            res.json(resultadoAutenticar);
        }else{
            res.send(204).send();
        }
       }
    ).catch(
        function (erro){
            console.log(erro);
            console.log("\n Houve um erro ao carregar funcionários! Erro: ", erro.sqlMessage);
            res.status(500), json(erro.sqlMessage);
        }
    )
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

function deletarSolicitacoes(req, res){
    const id = req.body.idServer;
    funcionarioModel.deletarSolicitacoes(id).then(
        function(resultado){
            res.json(resultado);
        }
    ).catch(
        function(erro){
            console.log(erro);
            console.log(
                "\n Houve um erro ao deletar! Erro: ", erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage)
        }
    )
}

function contarSolicitacoes(req, res) {
	funcionarioModel.contarSolicitacoes()
		.then((resultado) => {
		    res.json(resultado);
		})
		.catch((error) => {
			console.log(error);
			console.log("Erro nas Dashboards\n", error.sqlMessage);
            res.status(500).json(erro.sqlMessage);
		});
}

function contarFuncionarios(req, res) {
	funcionarioModel
		.contarFuncionarios()
		.then((resultado) => {
			res.json(resultado);
		})
		.catch((error) => {
			console.log(error);
			console.log("Erro nas Dashboards\n", error.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
}

function contarCargos(req, res) {
	funcionarioModel
		.contarCargos()
		.then((resultado) => {
			res.json(resultado);
		})
		.catch((error) => {
			console.log(error);
			console.log("Erro nas Dashboards\n", error.sqlMessage);
			res.status(500).json(erro.sqlMessage);
		});
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