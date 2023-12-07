INSERT INTO produto(id, nome, descricao, fabricante, modelo, preco)
VALUES
	(1, 'PC Gamer01', 'IntelCore3', 'Samsung', 'S1', 1234),
    (2, 'IPhone', 'Carregador e Fone', 'Apple', 'I5', 12000),
    (3, 'Laptop Ultra', 'AMD Ryzen 7', 'Dell', 'D2', 1800.00),
    (4, 'Smart TV 4K', 'Tela LED 55 polegadas', 'LG', 'L3', 2500),
    (5, 'Câmera DSLR', 'Sensor Full Frame', 'Canon', 'C4', 3000),
    (6, 'Fone de Ouvido Bluetooth', 'Cancelamento de Ruído', 'Sony', 'S5', 350),
    (7, 'Console de Videogame', '1TB de armazenamento', 'Microsoft', 'M6', 450),
    (8, 'Tablet Android', 'Tela HD 10 polegadas', 'Samsung', 'S7', 600),
    (9, 'Impressora Laser', 'Wi-Fi e Scanner', 'HP', 'H8', 200);

INSERT INTO cliente (id, nome, data_nascimento, email, cpf, senha, sexo, cep, bairro, rua, numero)
VALUES
    (1, 'João Silva', '1990-05-15', 'joao.silva@email.com', '123.456.789-01', 'senha123', 'M', '12345-678', 'Centro', 'Rua A', 123),
    (2, 'Maria Oliveira', '1985-08-20', 'maria.oliveira@email.com', '987.654.321-01', 'senha456', 'F', '54321-876', 'Bairro1', 'Rua B', 456),
    (3, 'Carlos Santos', '1982-03-10', 'carlos.santos@email.com', '654.321.987-01', 'senha789', 'M', '98765-432', 'Bairro2', 'Rua C', 789),
    (4, 'Ana Pereira', '1995-12-02', 'ana.pereira@email.com', '321.987.654-01', 'senhaABC', 'F', '87654-321', 'Bairro3', 'Rua D', 1011);

INSERT INTO avaliacao (id, nota, comentario, data_comentario)
VALUES
    (1, 4.5, 'Ótimo produto, estou muito satisfeito!', '2023-01-15'),
    (2, 3.8, 'Boa qualidade, mas a entrega foi um pouco demorada.', '2023-02-10'),
    (3, 5.0, 'Produto excelente, chegou antes do esperado.', '2023-03-05'),
    (4, 2.5, 'Não gostei muito, esperava mais qualidade.', '2023-04-20');


INSERT INTO item (id, quantidade, cor, imagem) VALUES
    (1, 4, 'preto', 'preto.jpg'),
    (2, 0, 'branco', 'branco.jpg'),
    (3, 2, 'cinza', 'cinza.jpg'),
    (4, 15, 'preto', 'preto.jpg');

-- Inserir um pedido com itens válidos
INSERT INTO pedido (id, data_pedido, status, itens) VALUES
    (1, '2023-01-01', 'Ativo', '{1, 2}' ),
    (2, '2023-01-02', 'Ativo', '{1,3}');


INSERT INTO avaliacao_do_produto(id, id_avaliacao, id_cliente, id_produto)
VALUES
	(1, 1, 1, 2),
	(2, 3, 4, 2),
	(3, 2, 3, 3),
	(4, 4, 2, 1);

INSERT INTO categoria(id, nome)
VALUES
	(1, 'Celular'),
	(2, 'Ferramenta'),
	(3, 'Gamer');

INSERT INTO produto_categoria(id, id_produto, id_categoria)
VALUES
	(1, 2, 1),
	(2, 6, 2),
	(3, 9, 2),
	(4, 1, 3),
	(5, 7, 3);

INSERT INTO produto_item(id, id_produto, id_item)
VALUES
    (1, 1, 1),
    (2, 3, 2),
    (3, 6, 3),
    (4, 8, 4);


INSERT INTO met_pagamento(id, nome, informacoes)
VALUES
    (1, 'Paypal', 'O Paypal é a mais antiga plataforma de cobranças online conhecida.'),
    (2, 'PagSeguro', 'Oferece pagamentos em cartão de crédito e débito online e também boleto.'),
    (3, 'PicPay', 'Taxa fixa de R$ 1,99 por transação.');

INSERT INTO cliente_pedido(id, id_cliente, id_pedido)
VALUES
    (1, 1, 2),
    (2, 2, 1);

INSERT INTO hist_pedidos(id, id_pedido, id_met_pagamento)
VALUES
    (1, 1, 1),
    (2, 2, 3);