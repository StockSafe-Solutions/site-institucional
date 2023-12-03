USE StockSafe;

CREATE OR REPLACE VIEW vw_kpi_banda_larga AS
       SELECT avg(r.valor) AS media, r.fk_servidor, s.codigo FROM tb_registro AS r JOIN tb_servidor AS s ON fk_servidor = id_servidor WHERE fk_cat = 6 GROUP BY fk_servidor;

CREATE OR REPLACE VIEW vw_kpi_pacotes_enviados AS
       SELECT avg(r.valor) AS media, r.fk_servidor, s.codigo FROM tb_registro AS r JOIN tb_servidor AS s ON fk_servidor = id_servidor WHERE fk_cat = 1 GROUP BY fk_servidor;

CREATE OR REPLACE VIEW vw_kpi_pacotes_recebidos AS
       SELECT avg(r.valor) AS media, r.fk_servidor, s.codigo FROM tb_registro AS r JOIN tb_servidor AS s ON fk_servidor = id_servidor WHERE fk_cat = 5 GROUP BY fk_servidor;

CREATE OR REPLACE VIEW vw_kpi_taxa_transferencia AS
       SELECT avg(r.valor) AS media, r.fk_servidor, s.codigo FROM tb_registro AS r JOIN tb_servidor AS s ON fk_servidor = id_servidor WHERE fk_cat = 4 GROUP BY fk_servidor;
