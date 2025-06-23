const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for appointments
let appointments = [];

// POST endpoint to create new appointments
app.post('/agendamento', (req, res) => {
    try {
        const appointment = req.body;
        appointments.push({
            id: Date.now(),
            ...appointment
        });
        res.status(201).json({ message: 'Consulta agendada com sucesso!', data: appointment });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao agendar consulta' });
    }
});
 
// GET endpoint to retrieve all appointments
app.get('/agendamento', (req, res) => {
    res.json(appointments);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
