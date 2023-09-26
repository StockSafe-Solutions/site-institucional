var database = require("../database/config");

function buscarUltimasMedidas(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        // instrucaoSql = `select top ${limite_linhas}
        // dht11_temperatura as temperatura, 
        // dht11_umidade as umidade,  
        //                 momento,
        //                 FORMAT(momento, 'HH:mm:ss') as momento_grafico
        //             from medida
        //             where fk_aquario = ${idMaquina}
        //             order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select valor as valor, 
        TIME_FORMAT(dataHora, "%H:%i") as momento_grafico 
        from registro  
        where fkMaquina = ${idMaquina} AND fkComponente = 3 
        order by idRegistro desc limit 8;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select valor as valor, 
                        TIME_FORMAT(dataHora, "%H:%i:%s") as momento_grafico 
                        from registro order by idRegistro desc limit 1 `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDemanda(){
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT * FROM vw_demanda WHERE hora <= 18.00;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarDemanda
}
