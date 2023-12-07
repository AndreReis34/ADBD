import dotenv from "dotenv";
dotenv.config();
import {selectCliente, insertCliente, updateCliente, deleteCliente} from "../db.js";
import {selectProduto, insertProduto, updateProduto, deleteProduto} from "../db.js";
import {produtos_por_categoria, obter_avaliacao, selectAuditoria} from "../db.js";


//ROTAS CLIENTE
export async function getCli(_, res){
  const clientes = await selectCliente();

  return res.status(200).json(clientes);
  
}

export async function addCli(req, res){

  const values = {
    id: req.body.id,
    nome: req.body.nome,
    data_nascimento: req.body.data_nascimento,
    email: req.body.email,
    cpf: req.body.cpf,
    senha: req.body.senha,
    sexo:req.body.sexo
  };

  const clienteInsert = await insertCliente(values)

  return res.status(200).json("Usuário criado com sucesso.");
  
};

export async function updateCli(req, res){
  
  const values = {
    nome: req.body.nome,
    data_nascimento: req.body.data_nascimento,
    email: req.body.email,
    cpf: req.body.cpf,
    senha: req.body.senha,
    sexo:req.body.sexo
  };

  const clienteUpdate = await updateCliente(req.params.id, values);

  return res.status(200).json("Usuário atualizado com sucesso.");
  
};

export async function deleteCli(req, res){
  const clienteDelete = await deleteCliente(req.params.id);

  return res.status(200).json("Usuário deletado com sucesso.");

};


//ROTAS PRODUTO
export async function getProd(_, res){
  const clientes = await selectProduto();

  return res.status(200).json(clientes);
  
}

export async function addProd(req, res){

  const values = {
    id: req.body.id,
    nome:req.body.nome,
    descricao: req.body.descricao,
    fabricante: req.body.fabricante,
    modelo: req.body.modelo,
    preco: req.body.preco
  };

  const clienteInsert = await insertProduto(values)

  return res.status(200).json("Usuário criado com sucesso.");
  
};

export async function updateProd(req, res){
  
  const values = {
    nome:req.body.nome,
    descricao: req.body.descricao,
    fabricante: req.body.fabricante,
    modelo: req.body.modelo,
    preco: req.body.preco
  };

  const clienteUpdate = await updateProduto(req.params.id, values);

  return res.status(200).json("Usuário atualizado com sucesso.");
  
};

export async function deleteProd(req, res){
  const clienteDelete = await deleteProduto(req.params.id);

  return res.status(200).json("Usuário deletado com sucesso.");

};

//Rotas funções
export async function produtos(req, res){
  const clientes = await produtos_por_categoria(req.body.categoria);

  return res.status(200).json(clientes);
}

export async function avaliacao(req, res){
  const clientes = await obter_avaliacao(req.body.id_avaliacao);

  return res.status(200).json(clientes);
}

export async function auditoria(_, res){
  const clientes = await selectAuditoria();

  return res.status(200).json(clientes);
}