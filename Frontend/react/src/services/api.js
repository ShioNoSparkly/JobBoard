
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

  // 401 = token scaduto o revocato durante la sessione → logout automatico
  if (res.status === 401) {
    window.dispatchEvent(new Event("auth:unauthorized"));
  }

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

// ── Autenticazione ────────────────────────────────────────────
export const authAPI = {
  // login: (email, password) =>
  //   request("POST", "/auth/login", { email, password }),

  login: async (email, password) => {
    let res;
    try {
      res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    } catch {
      throw new Error('Impossibile contattare il server. Controlla che il backend sia in esecuzione.');
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || 'Errore login');
    }

    // Salva il token nel localStorage (come fa getToken())
    localStorage.setItem('token', data.token);
    return data; // restituisce { token, user }
  },

  registra: (nome, email, password, role) =>
    request("POST", "/auth/registra", { nome, email, password, role }),
};

// ── Jobs ─────────────────────────────────────────────────────
export const jobsAPI = {
  getAllJobs: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.city)          params.append('city', filters.city);
    if (filters.contract_type) params.append('contract_type', filters.contract_type);
    if (filters.search)        params.append('search', filters.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return request("GET", `/jobs${query}`);
  },
  getCompanyJobs: () => request("GET", "/jobs/company"),
  createJob: (dati) => request("POST", "/jobs", dati),
  updateJob: (id, dati) => request("PATCH", `/jobs/${id}`, dati),
  deleteJob: (id) => request("DELETE", `/jobs/${id}`),
};


// ── application ──────────────────────────────────────────────────
export const applicationAPI = {
  apply: (job_id, cover_letter) =>
    request("POST", "/applications/apply", { job_id, cover_letter }),
  updateStatus: (id, status) => request("PATCH", `/applications/${id}/status`, { status }),
  getApplicationsByJob: (jobId) => request("GET", `/applications/job/${jobId}`),
  getMyApplications: () => request("GET", "/applications/mine"),
};