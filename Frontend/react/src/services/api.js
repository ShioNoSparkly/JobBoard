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

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// Avviso in console se la variabile manca (solo in sviluppo)
if (!import.meta.env.VITE_API_URL) {
    console.warn(
        "[api.js] VITE_API_URL non definita nel file .env.\n" +
        "Usando il fallback: http://localhost:3000/api\n" +
        "Copia .env.example in .env per risolvere.",
    );
}

function getToken() {
    return localStorage.getItem("token");
}

// services/api.js

async function request(method, path, body = null, params = null) {
    const token = getToken();

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };

    // Gestione nativa del body per POST, PUT, PATCH
    if (body && ["POST", "PUT", "PATCH"].includes(method)) {
        options.body = JSON.stringify(body);
    }

    // Costruiamo la Query String per passare i parametri (?city=... o ?search=...)
    let urlSpecifica = `${BASE_URL}${path}`;
    if (params) {
        const querySearch = new URLSearchParams(params).toString();
        if (querySearch) {
            urlSpecifica += `?${querySearch}`;
        }
    }

    let res;
    try {
        res = await fetch(urlSpecifica, options);
    } catch {
        throw new Error(
            "Impossibile contattare il server. Controlla che il backend sia in esecuzione.",
        );
    }

    const data = await res.json();

    if (res.status === 401) {
        window.dispatchEvent(new Event("auth:unauthorized"));
    }

    // dopo il fetch per evitare il crash di variabile indefinita
    if (!res.ok) {
        const err = new Error(data.errore || "Errore sconosciuto");
        err.status = res.status;
        throw err;
    }

    if (!data.successo) {
        const err = new Error(data.errore || "Errore sconosciuto");
        err.status = res.status;
        throw err;
    }

    return data.dati;
}


// ── Autenticazione ────────────────────────────────────────────
export const authAPI = {
    login: (email, password) =>
        request("POST", "/auth/login", { email, password }),

    registra: (nome, email, password, role) =>
        request("POST", "/auth/registra", { nome, email, password, role }),
};

// ── Jobs ─────────────────────────────────────────────────────
export const jobsAPI = {
    // Prende tutti i job senza filtri
    getAllJobs: () => request("GET", "/jobs"),

    // Cerca per parola chiave nel titolo
    getJobsByKeyword: (parolaChiave) => request("GET", "/jobs", null, { search: parolaChiave }),

    // Filtra contemporaneamente per città E tipo contratto
    getJobsByFilters: (citta, tipoContratto) => request("GET", "/jobs", null, { city: citta, contract_type: tipoContratto }),

    createJob: (dati) => request("POST", "/jobs", dati),
    updateJob: (id, dati) => request("PATCH", `/jobs/${id}`, dati),
    deleteJob: (id) => request("DELETE", `/jobs/${id}`),
};


// ── application ──────────────────────────────────────────────────
export const applicationAPI = {
    apply: (job_id, cover_letter) => request("POST", "/applications/apply", { job_id, cover_letter }),
    updateStatus: (id) => request("PATCH", `/jobs/${id}/status`),
    getApplicationsByJob: (jobId) => request("GET", `/applications/job/${jobId}`),
    getMyApplications: () => request("GET", "/applications/mine"),
};