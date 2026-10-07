const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const defaultPath = path.join(__dirname, 'tickets.sqlite');
let dbPath = process.env.DB_PATH;

if (!dbPath) {
  if (process.env.VERCEL) {
    dbPath = path.join('/tmp', 'tickets.sqlite');
    if (!fs.existsSync(dbPath) && fs.existsSync(defaultPath)) {
      try {
        fs.copyFileSync(defaultPath, dbPath);
      } catch (e) {
        console.warn('⚠️ Imp. de copier tickets.sqlite dans /tmp:', e.message);
      }
    }
  } else {
    dbPath = defaultPath;
  }
}

const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Performance & integrity
try {
  db.pragma('journal_mode = WAL');
} catch (e) {
  console.warn('⚠️ Mode WAL indisponible, fallback en journalisation standard');
}
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Autre',
    urgency TEXT NOT NULL DEFAULT 'Normale',
    status TEXT NOT NULL DEFAULT 'Nouveau',
    user_email TEXT NOT NULL,
    user_name TEXT DEFAULT '',
    priority INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME,
    last_action_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER NOT NULL,
    author TEXT NOT NULL,
    author_role TEXT NOT NULL DEFAULT 'user',
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER NOT NULL,
    old_status TEXT,
    new_status TEXT NOT NULL,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
  );
`);

console.log(`✅ Base de données connectée : ${dbPath}`);

module.exports = db;
