
// ============================================================
// index.js — Punto di ingresso dell'applicazione
// Qui configuriamo Express, i middleware globali e le route.
// Infine avviamo il server solo dopo aver inizializzato il DB.
// ============================================================


const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./src/middleware/errorHandler');
const seedAdmin = require('./src/middleware/seeder');

const cors = require('cors');// per risolvere problemi con il frontend

require('dotenv').config(); // Carica le variabili da .env in process.env

// Importiamo i model SOLO per inizializzare le tabelle all'avvio.
// Non li usiamo direttamente qui: ci servono solo per chiamare .init()
const userModel = require('./src/models/users');
const jobModel = require('./src/models/job_listings');
const applicationModel = require('./src/models/applications');


// Importiamo i router: ogni file routes gestisce un gruppo di endpoint
const userRoutes = require('./src/routes/users.routes');
const jobRoutes = require('./src/routes/jobRoutes');
const applicationRoutes = require('./src/routes/application.routes');
// const authRoutes = require('./src/routes/authRoutes');

const app = express();
const port = process.env.PORT;

// ── Rate Limiter Globale ──────────────────────────────────────
// Limita ogni IP a 100 richieste ogni 15 minuti.
// Protegge da attacchi di tipo brute-force e DDoS basilari.
const limiterGlobale = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: { successo: false, errore: 'Troppe richieste, riprova tra qualche minuto' }
});


// ── Middleware Globali ────────────────────────────────────────
// express.json() legge il body JSON delle richieste (POST, PATCH)
// e lo rende disponibile come req.body
app.use(express.json());

// helmet aggiunge header HTTP di sicurezza (anti-XSS, clickjacking, ecc.)
app.use(helmet());


// Log delle richieste per capire cosa succede 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Cors controlla quali origini esterne possono chiamare le nostre API.
// Da commentare/decommentare in base a quando il frontend è attivo.
app.use(cors({
    origin: 'http://localhost:5173', // URL esatto del frontend 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(limiterGlobale);

// ── Route di test ─────────────────────────────────────────────
// Endpoint rapido per verificare che il server sia raggiungibile
app.get('/', (req, res) => {
    res
        .status(200)
        .json({
            message: 'Backend avviato: OK',
            status: '200'
        });
});

// Montiamo le rotte con il prefisso /api
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/applications', applicationRoutes);


// ── Catch-all 404 ────────────────────────────────────────────
// Se nessuna route sopra ha risposto, l'endpoint richiesto non esiste.
app.use((req, res) => {
    res
        .status(404)
        .json({
            successo: false,
            errore: 'Endpoint non trovato'
        });
});

// ── Error Handler globale ─────────────────────────────────────
// Deve essere l'ULTIMO middleware: riceve tutti gli errori
// passati con next(err) da controller e middleware
app.use(errorHandler);


// ── Avvio asincrono del server ────────────────────────────────
// Aspettiamo che il DB sia pronto prima di ascoltare le richieste.
// L'ordine di init() è obbligatorio

const start = async () => {
    try {
        await userModel.init();
        await jobModel.init();
        await applicationModel.init();

        await seedAdmin();

        console.log('✅ Tabelle sincronizzate');

        app.listen(port, () =>
            console.log(`🚀 Server in ascolto su http://localhost:${port}`)
        );
    } catch (err) {
        console.error('❌ Errore di avvio:', err);
        process.exit(1); // Usciamo con codice errore se qualcosa va storto
    }
};

start();