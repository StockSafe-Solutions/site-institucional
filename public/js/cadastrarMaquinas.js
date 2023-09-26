function enviarDadosBanco(){

    // Especificações da máquina
    var qtdNucleosVar = ipt_qtdNucleos.value;
    var qtdProcessadoresLogicosVar = ipt_processadoresLogicos.value;
    var qtdRamVar =  ipt_memoriaRam.value;
    var qtdArmazenamentoVar =  ipt_armazenamento.value;
    // var cpuAtivoVar = ipt_cpuCheckbox.value;
    // var ramAtivoVar = ipt_ramCheckbox.value;
    // var discoAtivoVar = ipt_discoCheckbox.value; 
    
    fetch("/maquinas/cadastrar",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            nucleosServer: qtdNucleosVar,
            qtdProcessadoresLogicosServer: qtdProcessadoresLogicosVar,
            ramServer: qtdRamVar,
            armazenamentoServer: qtdArmazenamentoVar,
            //cpuAtivoServer: cpuAtivoVar,
            //ramAtivoServer: ramAtivoVar,
            //discoAtivoServer: discoAtivoVar
          }),
    }
    
    )
    
    }