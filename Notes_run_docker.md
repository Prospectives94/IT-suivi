Listed directory IT_suivi
Viewed Dockerfile:1-26
Viewed docker-compose.yml:1-13
Listed directory server
Viewed .env.example:1-43
Viewed index.js:1-29
Viewed package.json:1-26
Searched for "axios"
Searched for "/api/"
Listed directory client
Listed directory src
Listed directory api
Viewed client.js:1-20
Viewed README.md:1-294

Voici comment installer et configurer ce système avec Docker pour y accéder depuis n'importe quel appareil connecté à votre réseau local (LAN), sans nécessiter d'URL publique ou de service externe.

---

### Step 1 : Préparation de la configuration locale (`.env`)
Pour que l'application fonctionne correctement (notamment l'envoi de liens corrects par email si vous activez les notifications), le serveur doit connaître son adresse sur le réseau.

1. Créez un fichier [server/.env](file:///c:/Users/kzandstra/OneDrive%20-%20EVARISTE/Documents/Projets_IA/0.IA_projets/IT_suivi/server/.env) en copiant le fichier exemple [server/.env.example](file:///c:/Users/kzandstra/OneDrive%20-%20EVARISTE/Documents/Projets_IA/0.IA_projets/IT_suivi/server/.env.example).
2. Configurez les variables d'environnement, et modifiez en particulier la variable `APP_URL` pour utiliser l'adresse IP locale de la machine hôte :
   ```env
   PORT=3001
   APP_URL=http://<IP_LOCALE_DE_LA_MACHINE>:3001
   ```
   *(Remplacez `<IP_LOCALE_DE_LA_MACHINE>` par l'adresse IP réelle de la machine qui fait tourner Docker, par exemple `192.168.1.50`)*

---

### Step 2 : Trouver l'adresse IP locale de la machine hôte
Puisque vous êtes sous **Windows**, vous pouvez facilement trouver l'adresse IP locale de votre machine :
1. Ouvrez un terminal (PowerShell ou Invite de commandes).
2. Exécutez la commande suivante :
   ```powershell
   ipconfig
   ```
3. Recherchez l'**Adresse IPv4** (IPv4 Address) sous votre carte réseau active (Wi-Fi ou Ethernet). Elle ressemble généralement à `192.168.x.x` ou `10.x.x.x`.

> [!TIP]
> **IP Statique Locale :** Afin d'éviter que l'adresse IP locale de votre ordinateur hôte ne change (ce qui invaliderait l'adresse de connexion et les liens envoyés dans les emails), il est recommandé de configurer une adresse IP statique sur cette machine (dans les paramètres réseau de Windows ou via une réservation d'adresse DHCP sur votre routeur/box internet). 
> 
> Si vous ne pouvez pas utiliser d'IP statique, vous pouvez également utiliser le nom d'hôte réseau de l'ordinateur (ex: `http://nom-du-pc:3001` ou `http://nom-du-pc.local:3001`).

---

### Step 3 : Lancer l'application avec Docker
Les fichiers [Dockerfile](file:///c:/Users/kzandstra/OneDrive%20-%20EVARISTE/Documents/Projets_IA/0.IA_projets/IT_suivi/Dockerfile) et [docker-compose.yml](file:///c:/Users/kzandstra/OneDrive%20-%20EVARISTE/Documents/Projets_IA/0.IA_projets/IT_suivi/docker-compose.yml) sont déjà présents à la racine de votre projet.

1. Ouvrez votre terminal à la racine du projet (où se trouve le fichier [docker-compose.yml](file:///c:/Users/kzandstra/OneDrive%20-%20EVARISTE/Documents/Projets_IA/0.IA_projets/IT_suivi/docker-compose.yml)).
2. Exécutez la commande suivante pour construire l'image et démarrer le conteneur en arrière-plan :
   ```bash
   docker compose up -d --build
   ```

Cette commande se charge d'installer les dépendances du frontend et du backend, de compiler l'application React et de lancer le serveur de production. Les dossiers de base de données SQLite et la configuration `.env` sont partagés avec votre machine hôte pour assurer la persistance des données.

---

### Step 4 : Autoriser le port dans le pare-feu Windows
Par défaut, Windows bloque les connexions entrantes externes. Pour que d'autres ordinateurs de votre réseau local puissent accéder à l'application lancée sur votre machine, vous devez ouvrir le port `3001` dans le Pare-feu Windows.

Exécutez cette commande en tant qu'**Administrateur** dans **PowerShell** :
```powershell
New-NetFirewallRule -DisplayName "IT Ticket Manager Docker" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow
```

---

### Step 5 : Accéder à l'application
L'application est maintenant déployée localement :
- **Sur l'ordinateur qui exécute Docker :** Connectez-vous à `http://localhost:3001`.
- **Depuis les autres appareils du réseau local (PC, Mac, tablettes, smartphones) :** Ouvrez le navigateur et accédez à :
  ```
  http://<IP_LOCALE_DE_LA_MACHINE>:3001
  ```
  *(Par exemple : `http://192.168.1.50:3001`)*