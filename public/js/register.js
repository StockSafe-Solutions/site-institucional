  function cadastrar() {
  
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var cnpjVar = iptCNPJ.value;
    var razaoVar = iptRazao.value;
    var telefoneVar = iptTelefone.value; 
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;
    var confirmacaoSenhaVar = confirmacaoSenhaInput.value;
    var nomeFantasiaVar = iptFantasia.value;
    // var empresaVar = listaEmpresas.value;
    var cepVar = iptCEP.value;
    var ruaVar = iptRua.value;
    var bairroVar = iptBairro.value;
    var cidadeVar = iptCidade.value;
    var numeroVar = iptNumero.value;
    // if (
    //   nomeVar == "" ||
    //   emailVar == "" ||
    //   senhaVar == "" ||
    //   confirmacaoSenhaVar == "" ||
    //   empresaVar == ""
    // ) {
    //   cardErro.style.display = "block";
    //   mensagemErro.innerHTML =
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