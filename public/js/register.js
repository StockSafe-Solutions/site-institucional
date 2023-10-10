function cadastrar() {

  var nomeVar = iptNomeCompleto.value;
  var dataVar = iptData.value;
  var emailVar = iptEmail.value;
  var senhaVar = iptSenha.value;
  var confirmacaoSenhaVar = confirmacaoSenhaInput.value;

  fetch("/empresas/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Corrigir as rotas para novo modelo mais tarde
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
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado com sucesso! Redirecionando para tela de Login...',
        })

        setTimeout(() => {
          window.location = "../login.html";  
          console.log(resposta)
        }, "2000");

        limparFormulario();
        finalizarAguardar();
      } 
      else {
        alert("Houve um erro ao tentar realizar o cadastro!");
      }
    })
    .catch(function (resposta) {
      
      console.log(`#ERRO: ${resposta}`);
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