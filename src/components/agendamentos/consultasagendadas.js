// src/pages/ConsultasDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from'./Consultasagendadas.module.css'; 

function ConsultasDashboard() {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/consultas')
      .then(res => setConsultas(res.data))
      .catch(err => console.error('Erro ao buscar consultas:', err));
  }, []);

  const verDetalhes = (id) => {
    navigate('/detalhes-consulta', { state: { id } });
  };
  const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR');
};
  useEffect(() => {
    axios.get('http://localhost:5000/agendamento') 
      .then(res => setConsultas(res.data))
      .catch(err => console.error('Erro ao buscar consultas:', err));
  }, []);

  const editarConsulta = (id) => {
  
    navigate('/editar-consulta', { state: { id } });
  };

  const excluirConsulta = (id) => {
    // Exemplo simples
    axios.delete(`http://localhost:5000/agendamento/${id}`)
      .then(() => {
        setConsultas(consultas.filter(item => item._id !== id));
      })
      .catch(err => console.error('Erro ao excluir consulta:', err));
  };



  return (
  <div className={styles.dashboard}>
    {consultas.length === 0 ? (
      <p className={styles.semConsultas}>Nenhuma consulta agendada no momento.</p>
    ) : (
      consultas.map((consulta) => (
        <div key={consulta._id} className={styles.card} onClick={() => verDetalhes(consulta._id)}>
          <h3>{consulta.pet}</h3>
          <p><strong>Tutor:</strong> {consulta.nome_tutor}</p>
          <p><strong>Data:</strong> {formatarData(consulta.Data)}</p>
          <p><strong>Horário:</strong> {consulta.Horario}</p>
          <p><strong>Motivo:</strong> {consulta.Motivo}</p>
          <div className={styles.buttonGroup}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                editarConsulta(consulta._id);
              }}
              className={styles.editButton}>
              Editar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                excluirConsulta(consulta._id);
              }}
              className={styles.deleteButton}>
              Excluir
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);

}

export default ConsultasDashboard;
