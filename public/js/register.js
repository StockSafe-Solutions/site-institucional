function cadastrar() {

  var cnpjVar = iptCNPJ.value;
  var razaoVar = iptRazao.value;
  var telefoneVar = iptTelefone.value; 
  var emailVar = iptEmail.value;
  var senhaVar = iptSenha.value;
  var confirmacaoSenhaVar = confirmacaoSenhaInput.value;
  var nomeFantasiaVar = iptFantasia.value;
  var cepVar = iptCEP.value;
  var ruaVar = iptRua.value;
  var bairroVar = iptBairro.value;
  var cidadeVar = iptCidade.value;
  var numeroVar = iptNumero.value;

  fetch("/empresas/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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