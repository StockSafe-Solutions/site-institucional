var database = require("../database/config")

function listarTags(){
    var instrucao = "SELECT * FROM tb_tag;"
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpisTags(){
    var instrucao = "SELECT * FROM vw_kpis_tags"
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function tagsPorNome(nome, ordenacao){
    var instrucao = `
    SELECT t.*, COUNT(ts.fk_servidor) AS qtdServidores
        FROM tb_tag AS t
        JOIN tb_tag_servidor AS ts ON t.id_tag = ts.fk_tag
        WHERE nome_tag LIKE '%${nome}%'
		GROUP BY(id_tag)
        ${ordenacao};`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function graficosPorTags(tags){
    var instrucao = `
    SELECT
        data_hora,
        ROUND(avg (uso_da_cpu),1) AS uso_da_cpu,
        ROUND(avg (uso_da_ram),1) AS uso_da_ram
        FROM vw_registro AS r
        JOIN tb_tag_servidor AS ts ON r.fk_servidor = ts.fk_servidor
        JOIN tb_tag AS t ON ts.fk_tag = t.id_tag
        WHERE 
    `
    for(let i = 0; i < tags.length; i++){
        instrucao += `id_tag = ${tags[i]}`
        if(i+1 < tags.length){
            instrucao += " OR "
        }
    }
    instrucao += " GROUP BY data_hora;"

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpisPorTags(tags){
    var instrucao = `
    SELECT
		avg(taxt.taxa_de_transferência) AS kpi_taxa,
		avg(opt.taxa_de_transferência) AS base_taxa,
		sum(pct.pacotes_enviados) AS kpi_pacotes_enviados,
		sum((armazenamento_usado * 100) / armazenamento_total) AS kpi_armazenamento,
		sum(armazenamento_total) AS base_armazenamento
		FROM tb_servidor
			JOIN vw_taxa_de_transferência AS taxt ON taxt.fk_servidor = id_servidor
			JOIN tb_opcao AS opt
			JOIN vw_pacotes_enviados AS pct ON pct.fk_servidor = id_servidor
            JOIN tb_tag_servidor AS ts ON ts.fk_servidor = id_servidor
            JOIN tb_tag AS t ON t.id_tag = ts.fk_tag
			WHERE 
    `
    for(let i = 0; i < tags.length; i++){
        instrucao += `id_tag = ${tags[i]}`
        if(i+1 < tags.length){
            instrucao += " OR "
        }
    }
    instrucao += " GROUP BY DAY(pct.data_hora);"

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function inserirTag(nome, cor){
    var instrucao = `INSERT INTO tb_tag (nome_tag, cor_tag) VALUE ('${nome}', '${cor}')`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function colocarTagEmServidor(fkServidor, nomeTag){
    var instrucao = `
        INSERT INTO tb_tag_servidor
        VALUE ('${fkServidor}', (
            SELECT id_tag FROM tb_tag WHERE nome_tag = '${nomeTag}')
        );
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function desassociarTagsDeServidores(fkTag){
    var instrucao = `
        DELETE FROM tb_tag_servidor
        WHERE fk_tag = ${fkTag};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirTag(idTag){
    var instrucao = `
        DELETE FROM tb_tag
        WHERE id_tag = ${idTag}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function historicoAlerta(){
    var instrucao = "SELECT * FROM vw_historico_tags;"
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarTags,
    kpisTags,
    tagsPorNome,
    graficosPorTags,
    kpisPorTags,
    inserirTag,
    colocarTagEmServidor,
    desassociarTagsDeServidores,
    excluirTag,
    historicoAlerta
}