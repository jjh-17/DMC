FROM node:20.11.1-alpine
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm run build
COPY ./dist /app/dist
WORKDIR /app/dist
ENTRYPOINT nginx -g daemon off