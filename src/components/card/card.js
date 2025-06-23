import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Consultasagendadas.module.css';

function ConsultaCard() {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/agendamento') 
      .then(res => setConsultas(res.data))
      .catch(err => console.error('Erro ao buscar consultas:', err));
  }, []);

  const editarConsulta = (id) => {
   
    navigate('/editar-consulta', { state: { id } });
  };

  const excluirConsulta = (id) => {
 
    axios.delete(`http://localhost:5000/agendamento/${id}`)
      .then(() => {
        setConsultas(consultas.filter(item => item._id !== id));
      })
      .catch(err => console.error('Erro ao excluir consulta:', err));
  };
  return (
    <div onClick={() => onClick(consulta)} 
      
    >
      <h3 style={{ color: 'orange' }}>{consulta.pet}</h3>
      <p><strong>Tutor:</strong> {consulta.nome_tutor}</p>
      <p><strong>Data:</strong> {consulta.Data}</p>
      <p><strong>Hora:</strong> {consulta.Horario}</p>
           <div className={styles.buttonGroup}>
                 <button onClick={() => editarConsulta(consulta._id)} className={styles.editButton}>Editar</button>
                <button onClick={() => excluirConsulta(consulta._id)} className={styles.deleteButton}>Excluir</button>
          </div>
    </div>
  );
}

export default ConsultaCard;
