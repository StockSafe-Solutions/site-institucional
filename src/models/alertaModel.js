var database = require("../database/config")

function listarAlertas(){
    var instrucao = `SELECT tb_alerta.*, tb_servidor.codigo 
        FROM tb_alerta JOIN tb_servidor 
        ON tb_alerta.fk_servidor = tb_servidor.id_servidor`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarAlertas
}