
// Registrazione e Ruoli
//

const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        // Il controller passa tutto il body al service
        const user = await authService.registerUser(req.body);

        // Risposta di successo 
        res
            .status(201)
            .json({
                message: "Utente creato con successo",
                userId: user.id
            });
    } catch (err) {
        // Se il service lancia l'errore "Email già presente", 
        // qui useremo il suo statusCode
        res
            .status(err.statusCode || 500)
            .json({
                error: err.message || "Errore durante la registrazione"
            });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Il service si occupa di validare password e generare il token
        const { user, token } = await authService.loginUser(email, password);

        // Restituiamo il token e le info base dell'utente senza la pass criptata
        res
            .json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role
                }
            });
    } catch (err) {
        // Se le credenziali sono errate, il service lancia errore
        res
            .status(err.statusCode || 401)
            .json({
                error: err.message || "Credenziali non valide"
            });
    }
};

module.exports = {
    register,
    login
};
