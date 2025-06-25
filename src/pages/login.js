import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await fetch('https://vetalis-backend.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || 'Usuário ou senha inválidos');
        return;
      }

      // Supondo que o backend retorne um token JWT
      localStorage.setItem('token', data.token);

      navigate('/consultas'); // redireciona para rota protegida

    } catch (error) {
      setErro('Erro de conexão com o servidor');
      console.error(error);
    }
  };

  const handleRegistro = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
        <button type="button" onClick={handleRegistro}>Registrar</button>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}
      </form>
    </div>
  );
}

export default Login;
