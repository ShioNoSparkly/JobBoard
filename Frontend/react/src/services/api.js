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

async function request(method, path, body = null) {
  const token = getToken();

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (body) options.body = JSON.stringify(body);

  // Gestiamo esplicitamente gli errori di rete (backend spento, no internet)
  // separandoli dagli errori HTTP (4xx, 5xx)
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    // fetch lancia solo per errori di rete, mai per 4xx/5xx
    throw new Error("Impossibile contattare il server. Controlla che il backend sia in esecuzione.");
  }

  const data = await res.json();

  // 401 = token scaduto o revocato durante la sessione → logout automatico
  if (res.status === 401) {
    window.dispatchEvent(new Event("auth:unauthorized"));
  }

  if (!res.ok) {
    const err = new Error(data.errore || "Errore sconosciuto");
    err.status = res.status;
    throw err;
  }

  return data.dati;
}

// ── Autenticazione ────────────────────────────────────────────
export const authAPI = {
  // login: (email, password) =>
  //   request("POST", "/auth/login", { email, password }),

  login: async (email, password) => {
    let res;
    try {
      res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch {
      throw new Error("Impossibile contattare il server. Controlla che il backend sia in esecuzione.");
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Errore login");
    }

    // Salva il token nel localStorage (come fa getToken())
    localStorage.setItem("token", data.token);
    return data; // restituisce { token, user }
  },

  registra: (nome, email, password, role) => request("POST", "/auth/registra", { nome, email, password, role }),
};

// ── Jobs ─────────────────────────────────────────────────────
export const jobsAPI = {
  getAllJobs: async (filters = {}) => {
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}jobs.json`);
      let jobs = await res.json();

      if (filters.city) {
        const filterCity = filters.city.trim().toLowerCase();
        jobs = jobs.filter((j) => j.city && j.city.trim().toLowerCase() === filterCity);
      }

      if (filters.contract_type) {
        const contract = filters.contract_type.toLowerCase();
        jobs = jobs.filter((j) => j.contract_type && j.contract_type.toLowerCase() === contract);
      }

      if (filters.search) {
        const query = filters.search.toLowerCase();
        jobs = jobs.filter(
          (j) =>
            (j.title && j.title.toLowerCase().includes(query)) ||
            (j.description && j.description.toLowerCase().includes(query)),
        );
      }

      return jobs;
    } catch (err) {
      console.error("Errore nel caricamento dei lavori:", err);
      return [];
    }
  },
  getCompanyJobs: () => Promise.resolve([]),
  createJob: (dati) => Promise.resolve({}),
  updateJob: (id, dati) => Promise.resolve({}),
  deleteJob: (id) => Promise.resolve({}),
  getCities: async () => {
    try {
      const res = await fetch("./cities.json");
      const cities = await res.json();
      return cities;
    } catch (err) {
      console.error("Errore nel caricamento delle città statiche:", err);
      return [];
    }
  },
};
// ── application ──────────────────────────────────────────────────
export const applicationAPI = {
  apply: (job_id, cover_letter) => request("POST", "/applications/apply", { job_id, cover_letter }),
  updateStatus: (id, status) => request("PATCH", `/applications/${id}/status`, { status }),
  getApplicationsByJob: (jobId) => request("GET", `/applications/job/${jobId}`),
  getMyApplications: () => request("GET", "/applications/mine"),
};
