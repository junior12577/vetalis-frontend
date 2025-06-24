import { useEffect, useState } from 'react';
import axios from 'axios';
import {useLocation, useNavigate } from 'react-router-dom';
import styles from './DetalhesConsulta.module.css';


function DetalhesConsulta() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://vetalis-backend.onrender.com/agendamento/${id}`)
        .then(res => setConsulta(res.data))
        .catch(err => console.error('Erro ao buscar detalhes:', err));
    }
  }, [id]);

  if (!consulta) return <p>Carregando detalhes da consulta...</p>;

  return (
    <div className={styles.container}>
      <h2>Detalhes da Consulta</h2>
      <p><strong>Nome do Pet:</strong> {consulta.pet}</p>
      <p><strong>Nome do Tutor:</strong> {consulta.nome_tutor}</p>
      <p><strong>Idade do Pet:</strong> {consulta.idade_pet}</p>
      <p><strong>Telefone:</strong> {consulta.Telefone}</p>
      <p><strong>Email:</strong> {consulta.Email}</p>
      <p><strong>Rua:</strong> {consulta.Rua}</p>
      <p><strong>Cidade:</strong> {consulta.Cidade}</p>
      <p><strong>Estado:</strong> {consulta.Estado}</p>
      <p><strong>Motivo:</strong> {consulta.Motivo}</p>
      <p><strong>Data:</strong> {new Date(consulta.Data).toLocaleDateString()}</p>
      <p><strong>Horário:</strong> {consulta.Horario}</p>
      <button onClick={() => navigate('/consultas')}>Voltar</button>
    </div>
  );
}

export default DetalhesConsulta;
