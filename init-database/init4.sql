USE StockSafe;

CREATE OR REPLACE VIEW vw_banda_larga AS
       SELECT avg(valor), fk_servidor FROM tb_registro WHERE fk_cat = 6 GROUP BY fk_servidor;
