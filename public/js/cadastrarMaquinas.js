function enviarDadosBanco(){

    // Especificações da máquina
    var qtdNucleosVar = iptQtdNucleos.value;
    var qtdProcessadoresLogicosVar = iptProcessadoresLogicos.value;
    var qtdRamVar =  iptMemoriaRAM.value;
    var qtdArmazenamentoVar =  iptArmazenamento.value;
    
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
          }),
    }
    
    )
    
    }