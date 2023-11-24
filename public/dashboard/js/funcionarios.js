function listarFuncionarios() {
	fetch("/funcionario/listar", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			if (resposta.ok) {
				resposta.json().then((json) => {
					criarLiFuncionario(json, "ListarFuncionario");
				});
			} else {
				resposta.text().then((texto) => {
					console.warn(texto);
				});
			}
		})
		.catch(function (erro) {
			console.log(erro);
		});
}

function listarSolicitacoes() {
	fetch("/funcionario/solicitacoesFuncionarios", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			if (resposta.ok) {
				resposta.json().then((json) => {
					criarLiFuncionario(json, "ListarSolicitacoes");
				});
			} else {
				resposta.text().then((texto) => {
					console.warn(texto);
				});
			}
		})
		.catch(function (erro) {
			console.log(erro);
		});
}

function deletarSolicitacoes(id) {
	fetch(`/funcionario/deletarSolicitacoes/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			idServer: id,
		}),
	})
		.then(function (resposta) {
			console.log("resposta: ", resposta);
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});
}

function criarLiFuncionario(json, tipo) {
	let container = document.getElementById("container-funcionarios");
	if (tipo == "ListarFuncionario") {
		container.innerHTML = "";
		for (servidor in json) {
			item = json[servidor];

			container.innerHTML += `
            <li class="funcionario">
                <span>
                    <img src="../assets/img/fotosPadrao/undraw_profile.svg" alt="">
                    <span>
                        <p><b>${item.nome}</b> - ${item.funcao}</p>
                    </span>
                </span>
                <span>
                    <button title="Editar informações" onclick="abrirModal('editFunc','${item.id_funcionario}')">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#d2dcee}</style><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/></svg>                                </button>
                    </button>
                    <a href="mailto:${item.email}">
                        <button title="Mandar email" >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#dae2f1}</style><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                        </button>
                    </a>
                </span>
            </li>`;
		}
	} else if (tipo == "ListarSolicitacoes") {
		let container = document.getElementById(
			"container-funcionarios-solicitacao"
		);
		container.innerHTML = "";

		if (json.length > 0) {
			//containerVazio.className = ""

			for (servidor in json) {
				item = json[servidor];

				container.innerHTML += `
                <li class="funcionario">
                    <span>
                        <img src="../assets/img/fotosPadrao/undraw_profile.svg" alt="">
                        <span>
                            <p><b>${item.email}</b> - ${item.funcao}</p>
                        </span>
                    </span>
                    <span>
                        <button title="Editar informações" onclick = "deletarSolicitacoes(${item.id_funcionario})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                        <a href="mailto:${item.email}">
                            <button title="Mandar email">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#dae2f1}</style><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                            </button>
                        </a>
                    </span>
                </li>`;
			}
		} else {
			container.innerHTML = "<p>Nenhum convite pendente</p>";
			container.className = "containerVazio";
		}
	} else {
		console.log("Erro no tipo de listagem");
	}
}

function semiCadastrar() {
	var textoErro = "";
	var email = inpEmail.value;
	var funcao = inpFuncao.value;

	if (email == undefined || funcao == undefined) {
		textoErro += "Campo inválido";
		return;
	}
	if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
		textoErro += "Email inválido.";
		return;
	}

	fetch("/funcionario/enviarEmail", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			emailServer: email,
			funcaoServer: funcao,
		}),
	})
		.then(function (resposta) {
			console.log("Resposta: ", resposta);
			if (resposta.ok) {
				console.log("OK");
				Swal.fire({
					icon: "success",
					title: "Email enviado com sucesso!",
					text: "Contate o colaborador para que finalize seu cadastro!",
				});
			} else {
				console.log("não ok");
				console.log(`#ERRO: ${resposta}`);
				Swal.fire({
					icon: "error",
					title: "Erro interno!",
					text: "Erro no servidor do aplicativo. Contate seu administrador de TI.",
				});
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});

	inpEmail.value = "";
	inpFuncao.value = "";
}

function terminarCadastro() {
	var idVar = inpId.value;
	var nomeVar = inpNome.value;
	var dataVar = inpDate.value;
	var senhaVar = inpSenha.value;

	var validacoes = true;

	if (idVar == undefined) {
		console.log("Id vazio");
		validacoes = false;
	}
	if (nomeVar == undefined) {
		console.log("Nome vazio");
		validacoes = false;
	}
	if (nomeVar.length > 125) {
		validacoes = false;
		console.log("O nome deve ter no máximo 125 caracteres");
	}
	if (dataVar == undefined) {
		console.log("Data vazia");
		validacoes = false;
	}
	if (senhaVar == undefined) {
		console.log("Senha vazio");
		validacoes = false;
	}
	if (senhaVar.length > 20) {
		validacoes = false;
		console.log("A senha deve ter no máximo 20 caracteres.");
	}
	if (validacoes == false) {
		console.log("PRESTA ATENÇÃO");
	} else {
		fetch(`/funcionario/terminarCadastro/${idVar}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				idServer: idVar,
				nomeServer: nomeVar,
				dataServer: dataVar,
				senhaServer: senhaVar,
			}),
		})
			.then(function (resposta) {
				console.log("resposta: ", resposta);
			})
			.catch(function (resposta) {
				console.log(`#ERRO: ${resposta}`);
			});
	}
	inpId.value = "";
	inpNome.value = "";
	inpDate.value = "";
	inpSenha.value = "";
}

function carregarDadosFunc() {
	fetch(`/funcionario/contarSolicitacoes`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			if (resposta.ok) {
				resposta.json().then((json) => {
					chamarGraficos("nao", json);
				});
			} else {
				console.log(`#ERRO: ${resposta}`);
				resposta.text().then((texto) => {
					console.warn(texto);
				});
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});

	fetch(`/funcionario/contarFuncionarios`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			if (resposta.ok) {
				resposta.json().then((json) => {
					chamarGraficos("aceito", json);
				});
			} else {
				console.log(`#ERRO: ${resposta}`);
				resposta.text().then((texto) => {
					console.warn(texto);
				});
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});

	fetch(`/funcionario/contarCargos`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (resposta) {
			if (resposta.ok) {
				resposta.json().then((json) => {
					console.log(`TESTESSSSSSSSSSSSSSSSSSSSS`, json);
					chamarBarra(json);
				});
			} else {
				console.log(`#ERRO: ${resposta}`);
				resposta.text().then((texto) => {
					console.warn(texto);
				});
			}
		})
		.catch(function (resposta) {
			console.log(`#ERRO: ${resposta}`);
		});
}

var liv;
var usu;
function chamarGraficos(tipo, json) {
	legendas = ["Aceito", "Em espera"];
	label = ["Quantidade de aceitação"];
	const jsonArray = Array.from(json);
	if (tipo == "aceito") {
		const aceito = Number(jsonArray[0]["qtd_nomes"]);
		liv = aceito;
	} else if (tipo == "nao") {
		const nao = Number(jsonArray[0]["qtd_nomes_nulos"]);
		usu = nao;
	}
	dados = [liv, usu];
	gerenciarGraficosRosquinha("graficoFuncSA", dados, legendas, label);
}

function chamarBarra(json) {
	label = ["Cargos"];
	const jsonArray = Array.from(json);
    
   cargo = [];
   quantidade = [];
   for(i in json){
    cargo.push(json[i].funcao);
    quantidade.push(json[i].qtd);
   }

   console.log(cargo ,`vxvxvxffvsdfvsds`, quantidade)
    gerenciarGraficosBarra("graficoFuncoes", quantidade,cargo, label);
}

function reloadFuncionarios() {
	textoReload.innerText = "Atualizando";
	iconReload.style =
		"animation-name: girar; animation-duration: 2250ms; pointer-events: none";
	let i = 0;
	let animacaoTexto = setInterval(() => {
		if (i == 2) {
			clearInterval(animacaoTexto);
		}
		textoReload.innerText += ".";
		i++;
	}, 1000);

	setTimeout(() => {
		let now = new Date();
		textoReload.innerText =
			"Atualizado pela ultima vez às " +
			now.getHours() +
			":" +
			(String(now.getMinutes()).length == 1
				? "0" + now.getMinutes()
				: now.getMinutes());
		iconReload.style = "";
	}, 4500);

	if (iptPesquisa.value == "") {
		listarFuncionarios();
	} else {
		listarFuncionarios();
	}
}
setInterval(reloadFuncionarios, sessionStorage.intervalo_atualizacao);

function reloadSolicitacoes() {
	textoReload.innerText = "Atualizando";
	iconReload.style =
		"animation-name: girar; animation-duration: 2250ms; pointer-events: none";
	let i = 0;
	let animacaoTexto = setInterval(() => {
		if (i == 2) {
			clearInterval(animacaoTexto);
		}
		textoReload.innerText += ".";
		i++;
	}, 1000);

	setTimeout(() => {
		let now = new Date();
		textoReload.innerText =
			"Atualizado pela ultima vez às " +
			now.getHours() +
			":" +
			(String(now.getMinutes()).length == 1
				? "0" + now.getMinutes()
				: now.getMinutes());
		iconReload.style = "";
	}, 4500);

	listarSolicitacoes();
}
setInterval(reloadSolicitacoes, sessionStorage.intervalo_atualizacao);
