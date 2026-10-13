const db = require('../db/database');
const fs = require('fs');
const path = require('path');

function getSetting(key, defaultValue = null) {
  try {
    const row = db.prepare('SELECT value FROM app_settings WHERE key = ?').get(key);
    return row ? row.value : defaultValue;
  } catch (err) {
    console.error(`Erreur lecture paramètre ${key}:`, err);
    return defaultValue;
  }
}

function setSetting(key, value) {
  try {
    const stmt = db.prepare(`
      INSERT INTO app_settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `);
    stmt.run(key, value);
    return true;
  } catch (err) {
    console.error(`Erreur enregistrement paramètre ${key}:`, err);
    return false;
  }
}

function getTechPassword() {
  const stored = getSetting('tech_password');
  if (stored) return stored;
  return process.env.TECH_PASSWORD || 'IT2024';
}

function getDevPassword() {
  const stored = getSetting('dev_password');
  if (stored) return stored;
  return process.env.DEV_PASSWORD || 'DEV2024';
}

function updateTechPassword(newPassword) {
  // 1. Enregistrer dans la base de données SQLite
  setSetting('tech_password', newPassword);

  // 2. Mettre à jour la variable d'environnement en mémoire
  process.env.TECH_PASSWORD = newPassword;

  // 3. Mettre à jour le fichier server/.env si présent
  const envCandidates = [
    path.join(__dirname, '..', '.env'),
    path.join(__dirname, '..', '..', '.env'),
  ];

  for (const envPath of envCandidates) {
    try {
      if (fs.existsSync(envPath)) {
        let content = fs.readFileSync(envPath, 'utf8');
        if (/^TECH_PASSWORD=.*/m.test(content)) {
          content = content.replace(/^TECH_PASSWORD=.*/m, `TECH_PASSWORD=${newPassword}`);
        } else {
          content += `\nTECH_PASSWORD=${newPassword}\n`;
        }
        fs.writeFileSync(envPath, content, 'utf8');
      }
    } catch (e) {
      console.warn(`⚠️ Impossible de mettre à jour ${envPath} :`, e.message);
    }
  }

  return true;
}

module.exports = {
  getSetting,
  setSetting,
  getTechPassword,
  getDevPassword,
  updateTechPassword,
};
