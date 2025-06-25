import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConsultasDashboard.module.css';


function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/consultas')
      .then(res => setConsultas(res.data))
      .catch(err => console.error('Erro ao buscar consultas:', err));
  }, []);

  const handleClick = (consulta) => {
    navigate(`/consultas/${consulta._id}`, { state: { consulta } });
  };

  return (
    <div className="dashboard-container">
      {consultas.map((consulta) => (
        <div
          className="card"
          key={consulta._id}
          onClick={() => handleClick(consulta)}
        >
          <h3>{consulta.pet}</h3>
         
          <p><strong>Data:</strong> {new Date(consulta.Data).toLocaleDateString()}</p>
          <p><strong>Hora:</strong> {consulta.Horario}</p>
        </div>
      ))}
    </div>
  );
}

export default Consultas;
