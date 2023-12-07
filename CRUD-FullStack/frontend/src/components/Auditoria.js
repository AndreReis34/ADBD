//import axios from "axios";
import React from "react";
import styled from "styled-components";
//import { toast } from "react-toastify";
//import { FaTrash, FaEdit } from "react-icons/fa";


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

export const GridAud= ({ aud, setAud}) => {

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Operação</Th>
          <Th>Tabela</Th>
          <Th>Dados</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {aud.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.operacao}</Td>
            <Td width="30%">{item.tabela}</Td>
            <Td width="30%">{item.dados}</Td>
            
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

