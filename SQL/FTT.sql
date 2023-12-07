--Funções, Trigger, Transações

--Funções
--Descrição: Uma função que recebe o nome da Categoria e Envia os 
--Produtos dessa Categoria
DROP FUNCTION produtos_por_categoria;
CREATE OR REPLACE FUNCTION produtos_por_categoria(nome_categoria dm_nome)
RETURNS TABLE (nome_produto dm_nome, preco_produto decimal(9, 2))
AS $$
BEGIN
    RETURN QUERY
    SELECT p.nome, p.preco
    FROM produto p
    INNER JOIN produto_categoria pc ON p.id = pc.id_produto
    INNER JOIN categoria c ON pc.id_categoria = c.id
    WHERE c.nome = nome_categoria;
END;
$$ LANGUAGE plpgsql;

--Descrrição: Uma função que recebe o id de uma avaliação 
--e manda de volta o nome do cliente, o nome do produto e o comentario da Avaliação.
DROP FUNCTION obter_avaliacao_info;
CREATE OR REPLACE FUNCTION obter_avaliacao_info(id_avaliacao_do_produto integer)
RETURNS TABLE (nome_cliente dm_nome, nome_produto dm_nome, comentario text)
AS $$
BEGIN
    RETURN QUERY
    SELECT c.nome AS nome_cliente, p.nome AS nome_produto, a.comentario
    FROM avaliacao_do_produto ap
    INNER JOIN cliente c ON ap.id_cliente = c.id
    INNER JOIN produto p ON ap.id_produto = p.id
    INNER JOIN avaliacao a ON ap.id_avaliacao = a.id
    WHERE ap.id = id_avaliacao_do_produto;
END;
$$ LANGUAGE plpgsql;



--Triggers
--Descrição:Verifica se ainda tem o Item que foi selecionado pelo cliente 
CREATE OR REPLACE FUNCTION verifica_estoque()
RETURNS TRIGGER AS $$
DECLARE
    quantidade_disponivel integer;
BEGIN
    FOR i IN 1..array_length(NEW.itens, 1) LOOP
        SELECT quantidade INTO quantidade_disponivel
        FROM item
        WHERE id = NEW.itens[i]::integer;

        IF quantidade_disponivel IS NULL OR quantidade_disponivel <= 0 THEN
            RAISE EXCEPTION 'Item fora de estoque: %', NEW.itens[i];
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tgr_verifica_estoque
BEFORE INSERT OR UPDATE ON pedido
FOR EACH ROW
EXECUTE FUNCTION verifica_estoque();

--Descriçaõ: Atualiza o preço Total do pedido sempre que inserir e atualizar
CREATE OR REPLACE FUNCTION verifica_preco(idItem integer) RETURNS real AS $$
	SELECT pro.preco
	FROM produto_item AS pi
	INNER JOIN produto AS pro
	ON pro.id = pi.id_produto
	WHERE pi.id_item = idItem;
$$LANGUAGE SQL;


CREATE OR REPLACE FUNCTION verifica_precoTotal()
RETURNS TRIGGER AS $$
DECLARE
    preco real:=0;
BEGIN
    FOR i IN 1..array_length(NEW.itens, 1) LOOP
        preco:= preco + verifica_preco(NEW.itens[i]::integer);
    END LOOP;
    
    UPDATE pedido
    SET preco_total = preco
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tgr_verifica_precoTotal
AFTER INSERT OR UPDATE ON pedido
FOR EACH ROW
WHEN (pg_trigger_depth() < 1)
EXECUTE FUNCTION verifica_precoTotal();


--Descrição: Registra na tabela auditoria_admin todas as Operações feitas.
CREATE OR REPLACE FUNCTION registrar_auditoria()
RETURNS TRIGGER AS $$

BEGIN
    IF TG_OP = 'INSERT' or TG_OP = 'UPDATE' THEN
        INSERT INTO auditoria_admin (operacao, tabela, dados)
        VALUES (TG_OP, TG_TABLE_NAME, row_to_json(NEW)::text);
    ELSE
        INSERT INTO auditoria_admin (operacao, tabela, dados)
        VALUES (TG_OP, TG_RELNAME, row_to_json(OLD)::text);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tgr_auditoria_produto
AFTER INSERT OR UPDATE OR DELETE ON produto
FOR EACH ROW
EXECUTE FUNCTION registrar_auditoria();

CREATE TRIGGER tgr_auditoria_item
AFTER INSERT OR UPDATE OR DELETE ON item
FOR EACH ROW
EXECUTE FUNCTION registrar_auditoria();

CREATE TRIGGER tgr_auditoria_cliente
AFTER INSERT OR UPDATE OR DELETE ON cliente
FOR EACH ROW
EXECUTE FUNCTION registrar_auditoria();
