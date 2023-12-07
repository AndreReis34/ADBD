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

export const FormCliente = ({ getUsers, editC, setEditC }) => {
  const ref = useRef();

  useEffect(() => {
    if (editC) {
      const user = ref.current;

      user.id.value = editC.id;
      user.nome.value = editC.nome;
      user.email.value = editC.email;
      user.data_nascimento.value = editC.data_nascimento;
      user.cpf.value = editC.cpf;
      user.senha.value = editC.senha;
      user.sexo.value = editC.sexo;
    }
  }, [editC]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.id.value ||
      !user.nome.value ||
      !user.email.value ||
      !user.data_nascimento.value ||
      !user.cpf.value ||
      !user.senha.value ||
      !user.sexo.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (editC) {
      await axios
        .put("http://localhost:8800/cliente/" + editC.id, {
          nome: user.nome.value,
          email: user.email.value,
          data_nascimento: user.data_nascimento.value,
          cpf: user.cpf.value,
          senha: user.senha.value,
          sexo: user.sexo.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/cliente/", {
          id: user.id.value,
          nome: user.nome.value,
          email: user.email.value,
          data_nascimento: user.data_nascimento.value,
          cpf: user.cpf.value,
          senha: user.senha.value,
          sexo: user.sexo.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.id.value = ""
    user.nome.value = "";
    user.email.value = "";
    user.data_nascimento.value = "";
    user.cpf.value = "";
    user.senha.value = "";
    user.sexo.value = "";

    setEditC(null);
    getUsers();
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
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>
      <InputArea>
        <Label>Senha</Label>
        <Input name="senha" type="password" />
      </InputArea>
      <InputArea>
        <Label>CPF</Label>
        <Input name="cpf" />
      </InputArea>
      <InputArea>
        <Label>Sexo</Label>
        <Input name="sexo"/>
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

export const GridCliente = ({ users, setUsers, setEditC }) => {
  const handleEdit = (item) => {
    setEditC(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/cliente/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setEditC(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>CPF</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="20%">
              {item.cpf}
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
