import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

function AgendamentForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomePet: '',
    nomeTutor: '',
    idadePet: '',
    celular: '',
    email: '',
    cep: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    motivo: '',
    dataConsulta: '',
    horaConsulta: ''
  });

  const buscarEnderecoPorCEP = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (data.erro) {
        await MySwal.fire({
          icon: 'error',
          title: 'CEP não encontrado!',
          text: 'Por favor, verifique o CEP digitado.'
        });
        setForm(prev => ({ ...prev, rua: '', cidade: '', estado: '' }));
        return;
      }

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro || '',
        cidade: data.localidade || '',
        estado: data.uf || ''
      }));
    } catch (error) {
      console.error('Erro ao consultar o CEP:', error);
      await MySwal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao consultar o CEP. Tente novamente.'
      });
    }
  };

function formatarTelefone(value) {
    const numeros = value.replace(/\D/g, '');

    if (numeros.length <= 2) return '(' + numeros;
    if (numeros.length <= 7) return '(' + numeros.slice(0, 2) + ') ' + numeros.slice(2);
    if (numeros.length <= 11)
      return (
        '(' +
        numeros.slice(0, 2) +
        ') ' +
        numeros.slice(2, 7) +
        '-' +
        numeros.slice(7)
      );
    return (
      '(' +
      numeros.slice(0, 2) +
      ') ' +
      numeros.slice(2, 7) +
      '-' +
      numeros.slice(7, 11)
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'celular') {
      const valorFormatado = formatarTelefone(value);
      setForm((prev) => ({ ...prev, celular: valorFormatado }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    if (name === 'cep') {
      const cepLimpo = value.replace(/\D/g, '');
      if (cepLimpo.length === 8) {
        buscarEnderecoPorCEP(cepLimpo);
      } else {
        setForm((prev) => ({ ...prev, rua: '', cidade: '', estado: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.rua || !form.cidade || !form.estado) {
      await MySwal.fire({
        icon: 'warning',
        title: 'Dados incompletos',
        text: 'Preencha corretamente os dados do endereço!'
      });
      return;
    }

    const dados = {
      pet: form.nomePet,
      nome_tutor: form.nomeTutor,
      idade_pet: Number(form.idadePet),
      Telefone: form.celular,
      Email: form.email,
      Rua: form.rua,
      Numero: form.numero,
      Cidade: form.cidade,
      Estado: form.estado,
      Motivo: form.motivo,
      Data: form.dataConsulta,
      Horario: form.horaConsulta
    };

    try {
      const response = await axios.post('https://vetalis-backend.onrender.com/agendamento', dados);

      await MySwal.fire({
        icon: 'success',
        title: 'Agendamento realizado',
        text: response.data.mensagem || 'Consulta agendada com sucesso!'
      });

      navigate('/consultas', { state: dados });
    } catch (err) {
      if (err.response?.status === 409) {
        await MySwal.fire({
          icon: 'error',
          title: 'Conflito',
          text: 'Já existe uma consulta agendada para essa data e horário!'
        });
      } else {
        await MySwal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao agendar: ' + (err.response?.data?.message || 'erro desconhecido')
        });
      }
    }
  };

  // ... seu return do formulário fica igual

  return (
    <form onSubmit={handleSubmit}>
      {/* Inputs iguais */}
      <Input type="text" text="Nome do pet" name="nomePet" onChange={handleChange} value={form.nomePet} />
      <Input type="text" text="Nome do Tutor" name="nomeTutor" onChange={handleChange} value={form.nomeTutor} />
      <Input type="text" text="Idade do Pet" name="idadePet" onChange={handleChange} value={form.idadePet} />
      <Input
        type="tel"
        text="Número de celular"
        name="celular"
        onChange={handleChange}
        value={form.celular}
        maxLength={15}
      />
      <Input type="text" text="Email" name="email" onChange={handleChange} value={form.email} />
      <Input
        type="text"
        text="CEP"
        name="cep"
        onChange={handleChange}
        value={form.cep}
        maxLength={9}
        placeholder="Digite o CEP"
      />
      <Input
        type="text"
        text="Rua"
        name="rua"
        onChange={handleChange}
        value={form.rua}
        readOnly
        placeholder="Preenchido automaticamente"
      />
      <Input
        type="text"
        text="Número"
        name="numero"
        onChange={handleChange}
        value={form.numero}
      />
      <Input
        type="text"
        text="Cidade"
        name="cidade"
        onChange={handleChange}
        value={form.cidade}
        readOnly
        placeholder="Preenchido automaticamente"
      />
      <Input
        type="text"
        text="Estado"
        name="estado"
        onChange={handleChange}
        value={form.estado}
        readOnly
        placeholder="Preenchido automaticamente"
      />
      <Input
        type="text"
        text="O que está acontecendo com o pet?"
        name="motivo"
        onChange={handleChange}
        value={form.motivo}
      />
      <Input type="date" text="Data da Consulta" name="dataConsulta" onChange={handleChange} value={form.dataConsulta} />
      <Input
        type="time"
        text="Horario da Consulta"
        name="horaConsulta"
        onChange={handleChange}
        value={form.horaConsulta}
        min="08:00"
        max="18:00"
      />
      <SubmitButton text="Agendar Consulta" />
    </form>
    
  );
}

export default AgendamentForm;




  
