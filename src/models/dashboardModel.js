var database = require("../database/config")

function info(nome_funcao, info_query) {
    console.log(`\n[Dashboard Model] ${nome_funcao} => ${info_query}`)
}

function buscarDados(select) {
    info("buscarDados", select)

    return database.executar(select)
}

module.exports = {
    buscarDados
}