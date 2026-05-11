const express = require('express');
const app = express();

// Importa le rotte
const jobRoutes = require('./src/routes/jobRoutes');
const authRoutes = require('./src/routes/authRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');

// Middleware per leggere il formato JSON (senza questo la POST non funziona)
app.use(express.json());

// Log delle richieste per capire cosa succede (Debug)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Monta le rotte con il prefisso /api
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

// Gestione rotte non trovate
app.use((req, res) => {
    res.status(404).send("Rotta non trovata!");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
