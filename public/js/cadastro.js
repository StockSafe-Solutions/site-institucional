function cadastrar() {

  var nomeVar = iptNomeCompleto.value;
  var funcaoVar = "Analista";
  var dataVar = iptData.value;
  var emailVar = iptEmail.value;
  var senhaVar = iptSenha.value;
  var confirmacaoSenhaVar = confirmacaoSenhaInput.value;

  var validacoes = true;
  var textoErro = "";

  if(nomeVar.length > 125){
    validacoes = false;
    textoErro += "O nome deve ter no máximo 125 caracteres.\n";
  }
  if(funcaoVar.length > 75){
    validacoes = false;
    textoErro += "A função deve ter no máximo 75 caracteres.\n";
  }
  if(emailVar.length > 125){
    validacoes = false;
    textoErro += "O email deve ter no máximo 125 caracteres.\n";
  }
  if((emailVar.indexOf("@") == -1)||(emailVar.indexOf(".") == -1)){
    validacoes = false;
    textoErro += "Email inválido.";
  }
  if(senhaVar.length > 20){
    validacoes = false;
    textoErro += "A senha deve ter no máximo 20 caracteres.\n";
  }
  if(senhaVar != confirmacaoSenhaVar){
    validacoes = false;
    textoErro += "As senhas não coincidem.\n";
  }
  
  var numeros = [0,1,2,3,4,5,6,7,8,9]
  var temNumero = false;
  for(i in numeros){
    if(senhaVar.indexOf(numeros[i]) != -1){
      temNumero = true;
      break;
    }
  }

  var letrasMin = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",
  "v","w","x","y","z"]
  var temLetraMin = false;
  for(i in letrasMin){
    if(senhaVar.indexOf(letrasMin[i]) != -1){
      temLetraMin = true;
      break;
    }
  }

  var letrasMai = []
  for(i in letrasMin){
    letrasMai.push(letrasMin[i].toUpperCase())
  }
  var temLetraMai = false;
  for(i in letrasMai){
    if(senhaVar.indexOf(letrasMai[i]) != -1){
      temLetraMai = true;
      break;
    }
  }

  var especiais = [".","$",",","&","%","*","@","#","!"]
  var temEspecial = false;
  for(especial in especiais){
    if(senhaVar.indexOf(especial) != -1){
      temEspecial = true;
      break;
    }
  }

 if(!temNumero || !temLetraMin || !temLetraMin || !temEspecial){
    validacoes = false;
    textoErro += "A senha deve ter letras maiúsculas, minúsculas, números e um caractere especial.\n";
 }

 if((nomeVar.length == 0)||(funcaoVar.length == 0)||(emailVar.length == 0)||(senhaVar.length == 0)
    ||(confirmacaoSenhaVar.length == 0)){
    validacoes = false;
    textoErro = "Preencha todos os campos.\n";
  }

 if(!validacoes){
  Swal.fire({
    title: "Campos inválidos!",
    text: textoErro,
    icon: "error"
 })
 }
 else{
    fetch("/funcionario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        funcaoServer: funcaoVar,
        dataServer: dataVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: 'Redirecionando para tela de Login...'
          })

          setTimeout(() => {
            window.location = "../login.html";  
            console.log(resposta)
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } 
        else {
          Swal.fire({
            title: 'Erro interno!',
            text: 'Erro no servidor do aplicativo. Contate seu administrador de TI.',
            icon: 'error'
          })
        }
      })
      .catch(function (resposta) {
        
        console.log(`#ERRO: ${resposta}`);
      });
    return false;
 }
}