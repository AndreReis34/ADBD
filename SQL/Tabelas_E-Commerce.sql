CREATE DOMAIN dm_nome AS varchar(60) 
NOT NULL;

CREATE DOMAIN dm_sexo AS char(1)
DEFAULT 'M'
NOT NULL
CHECK (VALUE IN ('M', 'F'));

CREATE DOMAIN dm_data AS date
NOT NULL
DEFAULT '01/01/1950'
CHECK ( VALUE > '01/01/1950');

CREATE TYPE enum_status AS ENUM ('Ativo', 'Pausado', 'Finalizado');

CREATE TABLE cliente(
	id integer NOT NULL,
	nome dm_nome,
	data_nascimento dm_data,
	email varchar(50) NOT NULL,
	cpf varchar(14) NOT NULL,
	senha varchar(100) NOT NULL,
	sexo dm_sexo NOT NULL,
	cep varchar(15),
	bairro varchar(50),
	rua varchar(50),
	numero integer,
	CONSTRAINT cliente_pk PRIMARY KEY(id)
);

CREATE TABLE produto(
	id integer NOT NULL,
	nome dm_nome,
	descricao text NOT NULL,
	fabricante dm_nome,
	modelo dm_nome,
	preco decimal(9, 2) NOT NULL,
	promocoes real,
	CONSTRAINT produto_pk PRIMARY KEY(id)
);

CREATE TABLE avaliacao(
	id integer NOT NULL,
	nota real NOT NULL,
	comentario text NOT NULL,
	data_comentario dm_data ,
	CONSTRAINT avaliacao_pk PRIMARY KEY(id)
);

CREATE TABLE met_pagamento(
	id integer NOT NULL,
	nome dm_nome,
	informacoes text,
	CONSTRAINT met_pagamento_pk PRIMARY KEY(id)
);

CREATE TABLE categoria(
	id integer NOT NULL,
	nome dm_nome,
	CONSTRAINT categoria_pk PRIMARY KEY(id)
);

CREATE TABLE item(
	id integer NOT NULL,
	quantidade integer NOT NULL,
	cor varchar(30) NOT NULL,
	imagem varchar(50) NOT NULL,
	CONSTRAINT item_pk PRIMARY KEY(id)
);

CREATE TABLE avaliacao_do_produto(
	id integer NOT NULL,
	id_avaliacao integer NOT NULL,
	id_cliente integer,
	id_produto integer NOT NULL,
	CONSTRAINT avaliacoes_produto_pk PRIMARY KEY(id),
	CONSTRAINT avaliacao_fk FOREIGN KEY (id_avaliacao) REFERENCES avaliacao(id),
	CONSTRAINT cliente_fk FOREIGN KEY (id_cliente) REFERENCES cliente(id) ON DELETE SET NULL,
	CONSTRAINT produto_fk FOREIGN KEY (id_produto) REFERENCES produto(id) ON DELETE CASCADE
);

CREATE TABLE pedido(
	id integer NOT NULL,
	data_pedido dm_data,
	status enum_status,
	preco_total decimal(9, 2) DEFAULT NULL,
	itens text[] DEFAULT NULL,
	CONSTRAINT pedido_pk PRIMARY KEY(id)
);

CREATE TABLE cliente_pedido(
	id integer NOT NULL,
	id_cliente integer NOT NULL,
	id_pedido integer NOT NULL,
	CONSTRAINT cliente_pedido_pk PRIMARY KEY(id),
	CONSTRAINT cliente_fk FOREIGN KEY (id_cliente) REFERENCES cliente(id) ON DELETE CASCADE,
	CONSTRAINT pedido_fk FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON DELETE CASCADE
);

CREATE TABLE produto_item(
	id integer NOT NULL,
	id_produto integer NOT NULL,
	id_item integer NOT NULL,
	CONSTRAINT produto_item_pk PRIMARY KEY(id),
	CONSTRAINT produto_fk FOREIGN KEY (id_produto) REFERENCES produto(id) ON DELETE CASCADE,
	CONSTRAINT item_fk FOREIGN KEY (id_item) REFERENCES item(id) ON DELETE CASCADE
);
CREATE TABLE produto_categoria(
	id integer NOT NULL,
	id_produto integer NOT NULL,
	id_categoria integer NOT NULL,
	CONSTRAINT produto_categoria_pk PRIMARY KEY(id),
	CONSTRAINT produto_fk FOREIGN KEY (id_produto) REFERENCES produto(id) ON DELETE CASCADE,
	CONSTRAINT categoria_fk FOREIGN KEY (id_categoria) REFERENCES categoria(id) ON DELETE CASCADE
);
CREATE TABLE hist_pedidos(
	id integer NOT NULL,
	id_pedido integer NOT NULL,
	id_met_pagamento integer,
	CONSTRAINT hist_pedidos_pk PRIMARY KEY(id),
	CONSTRAINT pedido_fk FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON DELETE CASCADE,
	CONSTRAINT met_pagamento_fk FOREIGN KEY (id_met_pagamento) REFERENCES met_pagamento(id) ON DELETE SET NULL
);

CREATE TABLE auditoria_admin(
	id SERIAL,
	operacao text,
	tabela text,
	dados text,
	timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT auditoria_pk PRIMARY KEY(id)
);

