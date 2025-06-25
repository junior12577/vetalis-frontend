
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Agendamento from '../pages/agendconsul'
import Consultas from '../pages/consultas'
import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DetalhesConsulta from '../components/agendamentos/DetalhesConsulta';
import EditarConsulta from '../components/agendamentos/EditarConsulta';
import Login from '../pages/login'
import PrivateRoute from './PrivateRoute';
import Registro from '../pages/registro'; 
import Styles from './AppRoutes.module.css'



function AppRoutes() {
  const location = useLocation();
  const isLoginOrRegisterPage = location.pathname === '/' || location.pathname === '/register';


  return (

   <div className={Styles.pagina_container}>
  {!isLoginOrRegisterPage && <Navbar />}

  <main>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/agendamento" element={<PrivateRoute><Agendamento /></PrivateRoute>} />
      <Route path="/consultas" element={<PrivateRoute><Consultas /></PrivateRoute>} />
      <Route path="/detalhes-consulta" element={<PrivateRoute><DetalhesConsulta /></PrivateRoute>} />
      <Route path="/editar-consulta" element={<PrivateRoute><EditarConsulta /></PrivateRoute>} />
      <Route path="/register" element={<Registro />} />
    </Routes>
  </main>

  {!isLoginOrRegisterPage && <Footer />}
</div>

  );
}

export default AppRoutes;
