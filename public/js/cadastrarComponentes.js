function enviarDadosBanco(){

    // Especificações da máquina
   var nomeComponente = ipt_nomeComponente.value
if (ipt_porcentagem.checked) {
    var unidade = "porcentagem"
}else if (ipt_temperatura.checked) {
    var unidade = "temperatura"
}else if (ipt_tamanho.checked) {
    var unidade = "tamanho"
}
    // var cpuAtivoVar = ipt_cpuCheckbox.value;
    // var ramAtivoVar = ipt_ramCheckbox.value;
    // var discoAtivoVar = ipt_discoCheckbox.value; 
    
    fetch("/maquinas/cadastrarComponentes",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            nomeComponenteServer: nomeComponente,
            unidadeServer: unidade
          }),
    }
    
    )
    
    }