# Use uma imagem base para Node.js
FROM node:16-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Define a porta que será exposta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
