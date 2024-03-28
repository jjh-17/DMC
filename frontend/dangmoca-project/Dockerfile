FROM node:20.11.1-alpine
WORKDIR /app/fe
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm run build
COPY . .