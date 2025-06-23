import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Container from './Container';
import Logo from '../../img/logo_clinica.png';

function Navbar () {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.replace("/"); 
  };

  return (
        <nav className={styles.navbar}>
        <Container>
            
            <div className={styles.leftSection}>
            <Link to="/agendamento" className={styles.caixa_logo}>
                <img src={Logo} alt="pet" className={styles.logo} />
            </Link>
            </div>

            
            <div className={styles.centerSection}>
            <ul className={styles.list}>
                <li className={styles.item}>
                <Link to="/agendamento">Agendar Consulta</Link>
                </li>
                <li className={styles.item}>
                <Link to="/consultas">Consultas Agendadas</Link>
                </li>
            </ul>
            </div>

            
            <div className={styles.rightSection}>
            <button onClick={handleLogout} className={styles.botaoLogout}>
                Encerrar Sessão
            </button>
            </div>
        </Container>
        </nav>

  );
}

export default Navbar;
