import pg from 'pg';
const { Pool } = pg;

/*CREATE table mensagem(id PK, nome varchar(50))*/
async function connect() {
    if (global.connection)
        return global.connection.connect();

    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    //client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

//TABELA USUARIOS
export async function selectCliente() {
    const client = await connect();
    const res = await client.query('SELECT * FROM cliente');
    client.release();
    return res.rows;
}


export async function insertCliente(customer){
    const client = await connect();
    const sql = 'INSERT INTO cliente(id, nome, data_nascimento, email, cpf, senha, sexo) VALUES ($1, $2,$3,$4,$5,$6,$7);';
    const values = [customer.id, customer.nome, customer.data_nascimento, customer.email, customer.cpf, customer.senha, customer.sexo];
    const response = await client.query(sql, values);
    client.release();
    return response
}

export async function updateCliente(id, customer){
    const client = await connect();
    const sql = 'UPDATE cliente SET nome=$1, data_nascimento=$2, email=$3, cpf=$4, senha=$5, sexo=$6 WHERE id=$7';
    const values = [customer.nome, customer.data_nascimento, customer.email, customer.cpf, customer.senha, customer.sexo, id];
    const response = await client.query(sql, values);
    client.release();
    return response
}

export async function deleteCliente(id){
    const client = await connect();
    const sql = 'DELETE FROM cliente where id=$1;';
    const response = await client.query(sql,  [id]);
    client.release();
    return response
}


//FIM TABELA CLIENTE

//Começo tabela Produto
export async function selectProduto() {
    const client = await connect();
    const res = await client.query('SELECT * FROM produto');
    client.release();
    return res.rows;
}


export async function insertProduto(customer){
    const client = await connect();
    const sql = 'INSERT INTO produto(id, nome, descricao, fabricante, modelo, preco) VALUES ($1,$2,$3,$4,$5,$6);';
    const values = [customer.id, customer.nome, customer.descricao, customer.fabricante, customer.modelo, customer.preco];
    const response = await client.query(sql, values);
    client.release();
    return response
}

export async function updateProduto(id, customer){
    const client = await connect();
    const sql = 'UPDATE produto SET nome=$1, descricao=$2, fabricante=$3, modelo=$4, preco=$5 WHERE id=$6';
    const values = [customer.nome, customer.descricao, customer.fabricante, customer.modelo, customer.preco, id];
    const response = await client.query(sql, values);
    client.release();
    return response
}

export async function deleteProduto(id){
    const client = await connect();
    const sql = 'DELETE FROM produto where id=$1;';
    const response = await client.query(sql,  [id]);
    client.release();
    return response
}
//Fim tabela Produto

//Funções
export async function produtos_por_categoria(categoria){
    const client = await connect();
    const sql = 'SELECT produtos_por_categoria($1);';
    const values = [categoria];
    const res = await client.query(sql, values);
    client.release();
    return res.rows;
}

export async function obter_avaliacao(id){
    const client = await connect();
    const sql = 'SELECT obter_avaliacao_info($1);';
    const values = [id];
    const res = await client.query(sql, values);
    client.release();
    return res.rows;
}

export async function selectAuditoria() {
    const client = await connect();
    const res = await client.query('SELECT * FROM auditoria_admin;');
    client.release();
    return res.rows;
}
