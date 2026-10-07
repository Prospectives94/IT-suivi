# 🖥️ IT Ticket Manager — Service Informatique

Système de gestion et de suivi de demandes de support informatique (Ticketing IT), avec interface utilisateur intuitive, tableau de bord technicien, notifications par email et validation de résolution.

---

## 🚀 Fonctionnalités principales

### 👤 Côté Utilisateur / Demandeur
* **Création rapide de demande** : Titre, description, catégorie (Matériel, Logiciel, Réseau, Accès, Autre) et niveau d'urgence.
* **Suivi individuel** : Consultation de ses tickets en cours et résolus en saisissant son adresse email.
* **Messagerie & Échanges** : Fil de discussion interactif pour répondre au technicien.
* **✅ Validation de Résolution & Clôture** : Dès qu'un ticket est marqué *Résolu* par le service IT, l'utilisateur est invité à :
  * **Confirmer & Archiver** : Passe le ticket au statut **`Fermé`**.
  * **Rouvrir le ticket** : Repasse le ticket au statut **`En cours`** si le problème persiste.

### 🛠️ Côté Technicien (`/tech`)
* **Authentification sécurisée par PIN** (ex: `IT2024`).
* **Tableau de bord complet** : Filtrage par statut, catégorie, urgence, recherche textuelle et tri par priorité.
* **Gestion des statuts** : `Nouveau` ➔ `En cours` ➔ `En attente` ➔ `Résolu` ➔ `Fermé`.
* **Indicateur de retard SLA** : Détection automatique des tickets inactifs depuis plus de 48h.
* **Gestion des priorités** : Épinglage des tickets prioritaires.

### 📊 Statistiques & Analytics (`/analytics`)
* Métriques clés : volume de tickets, délai moyen de résolution, répartition par urgence et catégorie.

---

## 🛠️ Architecture Technique

* **Frontend** (`/client`) :
  * React 18 + Vite
  * Icons : `lucide-react`
  * Graphiques : `recharts`
  * Support PWA (Progressive Web App)
* **Backend** (`/server`) :
  * Node.js + Express
  * Base de données : SQLite embarquée (`better-sqlite3`) dans `./server/db/tickets.sqlite`
  * Notifications Email : `nodemailer` (SMTP Office 365 / Outlook / Custom)
* **Déploiement Multi-Services** :
  * Configuré pour **Vercel Services** (`vercel.json`)
  * Support conteneurisé via **Docker** (`Dockerfile` & `docker-compose.yml`)

---

## 💻 Démarrage en Local

### Prerequisites
* **Node.js** (v18+)
* **npm**

### 1. Installation des dépendances
```bash
# Dans le dossier server
cd server
npm install

# Dans le dossier client
cd ../client
npm install
```

### 2. Configuration des variables d'environnement (`server/.env`)
Créez le fichier `server/.env` (ou copiez `server/.env.example`) :
```env
PORT=3001
APP_URL=http://localhost:5173
TECH_PASSWORD=Julien2026!

# Configuration SMTP pour l'envoi d'emails (Optionnel)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=votre_email@domaine.com
SMTP_PASS=votre_mot_de_passe
IT_EMAIL=julien.marty@fedevariste.com
```

### 3. Lancement des serveurs de développement
```bash
# Démarrer le serveur API (Backend - Port 3001)
cd server
node index.js

# Dans un autre terminal, démarrer l'application React (Frontend - Port 5173)
cd client
npx vite
```
Accédez à l'application sur : **`http://localhost:5173`**

*(Sur Windows, vous pouvez également lancer directement le script `start.bat`)*

---

## 🐳 Démarrage avec Docker

```bash
docker-compose up -d --build
```
L'application sera accessible sur `http://localhost:3001`.

---

## ☁️ Déploiement sur Vercel (Services)

Le projet intègre une configuration **Vercel Services** (`vercel.json`) :
1. Importez le dépôt sur Vercel.
2. Choisissez l'option **"Group into a single project using Services"**.
3. Vercel déploiera automatiquement le `client` (Vite) et le `server` (Express) au sein du même domaine unifié.

---

## 📄 Licence
Propriété interne — Service Informatique.
