// ============================================================
// services/api.js — Livello di accesso alle API del backend
// ============================================================
// L'URL base viene letto dal file .env tramite import.meta.env.
// In Vite, le variabili d'ambiente accessibili al browser
// devono avere il prefisso VITE_.
//
// Se la variabile non è definita, usiamo un fallback di sviluppo
// così l'app non crasha completamente con un messaggio criptico.
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

// Avviso in console se la variabile manca (solo in sviluppo)
if (!import.meta.env.VITE_API_URL) {
    console.warn(
        '[api.js] VITE_API_URL non definita nel file .env.\n' +
        'Usando il fallback: http://localhost:3000/api\n' +
        'Copia .env.example in .env per risolvere.'
    )
}

export const customFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('jobBoardToken');

    // Configurazione base degli header
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Se il token esiste nel localStorage, lo inseriamo nell'header Authorization
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    // Se la risposta non è corretta (es. 400, 401, 403, 404, 500), lanciamo l'errore del backend
    if (!response.ok) {
        throw new Error(data.errore || 'Si è verificato un errore');
    }

    return data;
};
