import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

export const FormProduto = ({ getProds, editP, setEditP }) => {
  const ref = useRef();

  useEffect(() => {
    if (editP) {
      const prod = ref.current;

      prod.id.value = editP.id;
      prod.nome.value = editP.nome;
      prod.descricao.value = editP.descricao;
      prod.fabricante.value = editP.fabricante;
      prod.modelo.value = editP.modelo;
      prod.preco.value = editP.preco;
    }
  }, [editP]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prod = ref.current;

    if (
      !prod.id.value ||
      !prod.nome.value ||
      !prod.descricao.value ||
      !prod.fabricante.value ||
      !prod.modelo.value ||
      !prod.preco.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (editP) {
      await axios
        .put("http://localhost:8800/produto/" + editP.id, {
          nome: prod.nome.value,
          descricao: prod.descricao.value,
          fabricante: prod.fabricante.value,
          modelo: prod.modelo.value,
          preco: prod.preco.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/produto/", {
          id: prod.id.value,
          nome: prod.nome.value,
          descricao: prod.descricao.value,
          fabricante: prod.fabricante.value,
          modelo: prod.modelo.value,
          preco: prod.preco.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    prod.id.value = ""
    prod.nome.value = "";
    prod.descricao.value = "";
    prod.fabricante.value = "";
    prod.modelo.value = "";
    prod.preco.value = "";


    setEditP(null);
    getProds();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
      <Label>ID</Label>
        <Input name="id" />
      </InputArea>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="descricao" type="text" />
      </InputArea>
      <InputArea>
        <Label>Fabricante</Label>
        <Input name="fabricante" />
      </InputArea>
      <InputArea>
        <Label>Modelo</Label>
        <Input name="modelo"/>
      </InputArea>
      <InputArea>
        <Label>Preço</Label>
        <Input name="preco"/>
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};




const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const GridProduto = ({ prods, setProds, setEditP }) => {
  const handleEdit = (item) => {
    setEditP(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/produto/" + id)
      .then(({ data }) => {
        const newArray = prods.filter((prod) => prod.id !== id);

        setProds(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setEditP(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Descrição</Th>
          <Th>Preço</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {prods.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.descricao}</Td>
            <Td width="20%">
              {item.preco}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
            
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

///export default Grid;
//export default Form;
