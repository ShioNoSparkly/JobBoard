

const express = require('express');
const cors = require('cors');
const app = express();

// Importiamo le rotte
const jobRoutes = require('./src/routes/jobRoutes');
const userRoutes = require('./src/routes/users.routes');
const applicationRoutes = require('./src/routes/application.routes');

// const authRoutes = require('./src/routes/authRoutes');

app.use(cors({
  origin: 'http://localhost:5173',   
  credentials: true
}));

// Middleware per leggere il formato JSON 
app.use(express.json());

// Log delle richieste per capire cosa succede 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Montiamo le rotte con il prefisso /api
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/applications', applicationRoutes);

// Gestione rotte non trovate
app.use((req, res) => {
    res.status(404).send("Rotta non trovata!");
});

//Server in ascolto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
