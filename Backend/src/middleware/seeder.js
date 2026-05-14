const usersModel = require("../models/users");
const bcrypt = require("bcrypt");

const SALT_ROUND = 12;

const seedAzienda = async () => {
  const email = process.env.AZIENDA_EMAIL;
  const password = process.env.AZIENDA_PASSWORD;
  const nome = process.env.AZIENDA_NOME || "Azienda";

  if (process.env.NODE_ENV !== "development") {
    console.warn('⚠️  Seeder saltato: NODE_ENV non è "development".');
    console.warn(
      "   Per creare l'azienda, imposta NODE_ENV=development nel .env",
    );
    return;
  }

  if (!email || !password) {
    console.warn(
      "⚠️  Seeder azienda saltato: AZIENDA_EMAIL o AZIENDA_PASSWORD mancanti nel .env",
    );
    return;
  }

  try {
    const verificaUtente = await usersModel.findByEmail(email);
    if (verificaUtente.rows.length) {
      console.log("ℹ️  Azienda già presente, seeder saltato.");
      return;
    }

    const hash = await bcrypt.hash(password, SALT_ROUND);
    await usersModel.create({ nome, email, password: hash, role: "azienda" });
    console.log(`✅ Azienda creata: ${email}`);
  } catch (err) {
    // Non blocchiamo l'avvio del server se il seeder fallisce
    console.error("❌ Errore nel seeder azienda:", err.message);
  }
};

module.exports = seedAzienda;
