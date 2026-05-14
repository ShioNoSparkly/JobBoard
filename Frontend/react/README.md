# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



per inserire i dati nel DB, usa questa Query su dbeaver:

INSERT INTO job_listings (company_id, title, description, contract_type, city, salary) VALUES
(5, 'Backend Developer', 'Esperienza con Node.js e PostgreSQL richiesta.', 'Indeterminato', 'Roma', 35000),
(5, 'UI/UX Designer', 'Esperienza con Figma e Adobe XD.', 'Part Time', 'Torino', 28000),
(5, 'Data Analyst', 'Competenze in Python e SQL per analisi dati.', 'Indeterminato', 'Milano', 38000),
(5, 'DevOps Engineer', 'Esperienza con Docker, Kubernetes e CI/CD.', 'Indeterminato', 'Napoli', 42000),
(7, 'Mobile Developer', 'Sviluppo app iOS e Android con React Native.', 'Indeterminato', 'Firenze', 36000),
(7, 'Full Stack Developer', 'React e Node.js, esperienza 3 anni.', 'Indeterminato', 'Bologna', 40000),
(7, 'Cybersecurity Specialist', 'Gestione sicurezza reti e sistemi aziendali.', 'Indeterminato', 'Roma', 45000),
(7, 'Project Manager IT', 'Gestione progetti software con metodologia Agile.', 'Part Time', 'Milano', 33000),
(8, 'Cloud Architect', 'Progettazione infrastrutture cloud AWS e Azure.', 'Indeterminato', 'Roma', 50000),
(8, 'QA Engineer', 'Testing automatizzato con Selenium e Cypress.', 'Part Time', 'Torino', 29000),
(8, 'AI Engineer', 'Machine learning e deep learning con Python.', 'Indeterminato', 'Milano', 55000),
(8, 'Scrum Master', 'Facilitazione team Agile e gestione sprint.', 'Part Time', 'Bologna', 31000);