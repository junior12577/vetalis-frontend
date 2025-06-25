import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Registro.module.css';

function Registro() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await fetch('https://vetalis-backend.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || 'Erro ao registrar usuário');
        return;
      }

      alert('Usuário registrado com sucesso!');
      navigate('/'); // Redireciona para página de login
    } catch (error) {
      setErro('Erro de conexão com o servidor');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleRegistro} className={styles.form}>
        <h2>Registro</h2>

        <input
          type="text"
          placeholder="Novo Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nova Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Registrar</button>

        {erro && <p className={styles.erro}>{erro}</p>}
      </form>
    </div>
  );
}

export default Registro;
