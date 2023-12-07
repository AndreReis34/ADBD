import GlobalStyle from "./styles/global";
import styled from "styled-components";
import {FormCliente, GridCliente} from "./components/Cliente.js";
import {FormProduto, GridProduto} from "./components/Produto.js";
//import {FormPesq, GridPesq} from "./components/Pesquisa.js";
import {GridAud} from "./components/Auditoria.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
//display: flex;
const Title = styled.h2`
  color: red;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [prods, setProds] = useState([]);
  //const [pesq, setPesq] = useState([]);
  const [aud, setAud] = useState([]);
  //const [aval, setAval] = useState([]);
  const [editC, setEditC] = useState(null);
  const [editP, setEditP] = useState(null);



  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/cliente/");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      getAud();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);



  const getProds = async () => {
    try {
      const res = await axios.get("http://localhost:8800/produto/");
      setProds(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      getAud();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProds();
  }, [setProds]);


  const getAud = async () => {
    try {
      const res = await axios.get("http://localhost:8800/table/")
      setAud(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAud();
  }, [setAud]);

  return (
    <>
      <Container>
        <Title>CLIENTE</Title>
        <FormCliente editC={editC} setEditC={setEditC} getUsers={getUsers} />
        <GridCliente setEditC={setEditC} users={users} setUsers={setUsers} />
        <Title>PRODUTO</Title>
        <FormProduto editP={editP} setEditP={setEditP} getProds={getProds} />
        <GridProduto setEditP={setEditP} prods={prods} setProds={setProds} />
        <Title>AUDITORIA</Title>
        <GridAud aud={aud} setAud={setAud} />
        
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;