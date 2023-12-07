//import axios from "axios";
import React, {useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
//import { FaTrash, FaEdit } from "react-icons/fa";

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

export const FormPesq = ({ getPesq }) => {
  const ref = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.categoria.value
    ) {
      return toast.warn("Preencha o campo!");
    }

    getPesq(user.categoria.value);

    user.categoria.value = "";

    //getPesq(categ);
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Categoria</Label>
        <Input name="categoria" />
      </InputArea>

      <Button type="submit">Pesquisar</Button>
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

export const GridPesq= ({ pesq, setPesq}) => {

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome Produto</Th>
          <Th>Preço</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {pesq.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome_produto}</Td>
            <Td width="30%">{item.preco_produto}</Td>
            
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

