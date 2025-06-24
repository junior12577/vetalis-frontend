import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './EditarConsulta.module.css';

function EditarConsulta() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [form, setForm] = useState({
    pet: '',
    nome_tutor: '',
    idade_pet: '',
    Telefone: '',
    Email: '',
    Rua: '',
    Cidade: '',
    Estado: '',
    Motivo: '',
    Data: '',
    Horario: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`https://vetalis-backend.onrender.com/agendamento/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error('Erro ao buscar consulta:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://vetalis-backend.onrender.com/agendamento/${id}`, form)
      .then(() => {
        alert('Consulta atualizada com sucesso!');
        navigate('/consultas');
      })
      .catch(err => console.error('Erro ao atualizar consulta:', err));
  };

  return (
    <>
    <h2 className={styles.title}>Editar Consulta</h2>
    <div className={styles.container}>
      
     <form onSubmit={handleSubmit}>
      
        <div className={styles['form-group']}>
          <label>Nome do Pet:</label>
          <input type="text" name="pet" value={form.pet} onChange={handleChange} />
        </div>
        <div className={styles['form-group']}>
          <label>Nome do Tutor:</label>
          <input type="text" name="nome_tutor" value={form.nome_tutor} onChange={handleChange} />
        </div>

        <div className={styles['form-group']}>
          <label>Idade do Pet:</label>
          <input type="number" name="idade_pet" value={form.idade_pet} onChange={handleChange} />
        </div>
        <div className={styles['form-group']}>
          <label>Telefone:</label>
          <input type="text" name="Telefone" value={form.Telefone} onChange={handleChange} />
        </div>

        <div className={styles['form-group']}>
          <label>Email:</label>
          <input type="email" name="Email" value={form.Email} onChange={handleChange} />
        </div>
        <div className={styles['form-group']}>
          <label>Rua:</label>
          <input type="text" name="Rua" value={form.Rua} onChange={handleChange} />
        </div>

        <div className={styles['form-group']}>
          <label>Cidade:</label>
          <input type="text" name="Cidade" value={form.Cidade} onChange={handleChange} />
        </div>
        <div className={styles['form-group']}>
          <label>Estado:</label>
          <input type="text" name="Estado" value={form.Estado} onChange={handleChange} />
        </div>

        <div className={styles['form-group']}>
          <label>Motivo:</label>
          <input type="text" name="Motivo" value={form.Motivo} onChange={handleChange} />
        </div>
        <div className={styles['form-group']}>
          <label>Data:</label>
          <input type="date" name="Data" value={form.Data.substring(0, 10)} onChange={handleChange} />
        </div>

        <div className={styles['form-group']}>
          <label>Horário:</label>
          <input type="time" name="Horario" value={form.Horario} onChange={handleChange} />
        </div>

        <div className={styles['button-container']}>
          <button type="submit">Salvar Alterações</button>
        </div>
    </form>

    </div>

    </>
  );
}

export default EditarConsulta;
