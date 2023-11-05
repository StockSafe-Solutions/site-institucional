var database = require("../database/config")

function listar(){
    var instrucao = `SELECT * FROM tb_opcao`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterar(id, bandaLarga, taxaTransf, intervalo){
    var instrucao = `UPDATE tb_opcao
        SET banda_larga = ${bandaLarga}, taxa_transferencia = ${taxaTransf},
            intervalo_atualizacao = ${intervalo}
        WHERE id_opcao = ${id}`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    alterar
}