FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Installer les dépendances
RUN cd client && npm install
RUN cd server && npm install

# Copier tout le code
COPY . .

# Build du frontend (React)
RUN cd client && npm run build

# Exposer le port du serveur backend
EXPOSE 3001

# Lancer le serveur backend (qui sert aussi le frontend)
WORKDIR /app/server
CMD ["node", "index.js"]
