# Usa un'immagine di base con Node.js e Yarn preinstallato
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di configurazione di progetto (package.json, package-lock.json, yarn.lock)
COPY package.json yarn.lock ./

# Installa le dipendenze con Yarn
RUN yarn install --frozen-lockfile

# Copia il resto dei file del progetto
COPY . .

# Espone la porta 3000 per il server Next.js
EXPOSE 3000

# Comando per eseguire l'app Next.js in modalità sviluppo
CMD ["yarn", "dev"]
