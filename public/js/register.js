  function cadastrar() {
  
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var cnpjVar = ipt_cnpj.value;
    var razaoVar = ipt_razao.value;
    var telefoneVar = ipt_telefone.value; 
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;
    var nomeFantasiaVar = ipt_fantasia.value;
    // var empresaVar = listaEmpresas.value;
    var cepVar = ipt_cep.value;
    var ruaVar = ipt_rua.value;
    var bairroVar = ipt_bairro.value;
    var cidadeVar = ipt_cidade.value;
    var numeroVar = ipt_numero.value;
    // if (
    //   nomeVar == "" ||
    //   emailVar == "" ||
    //   senhaVar == "" ||
    //   confirmacaoSenhaVar == "" ||
    //   empresaVar == ""
    // ) {
    //   cardErro.style.display = "block";
    //   mensagem_erro.innerHTML =
    //     "(Mensagem de erro para todos os campos em branco)";

    //   finalizarAguardar();
    //   return false;
    // } else {
    //   setInterval(sumirMensagem, 5000);
    // }

    // Enviando o valor da nova input
    fetch("/empresas/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        cnpjServer: cnpjVar,
        razaoServer: razaoVar,
        telefoneServer: telefoneVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        nomeFantasiaServer: nomeFantasiaVar,
        cepServer: cepVar,
        ruaServer: ruaVar,
        bairroServer: bairroVar,
        cidadeServer: cidadeVar,
        numeroServer: numeroVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          // cardErro.style.display = "block";
          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso! Redirecionando para tela de Login...',
          })
          // alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

          setTimeout(() => {
            window.location = "../login.html";  
            console.log(resposta)
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          alert("Houve um erro ao tentar realizar o cadastro!");
        }
      })
      .catch(function (resposta) {
        
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
      });

    return false;
  }

  function listar() {
    fetch("/empresas/listar", {
      method: "GET",
    })
      .then(function (resposta) {
        resposta.json().then((empresas) => {
          empresas.forEach((empresa) => {
            listaEmpresas.innerHTML += `<option value='${empresa.id}'>${empresa.cnpj}</option>`;
          });
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }