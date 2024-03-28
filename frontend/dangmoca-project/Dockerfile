FROM node:20.11.1-alpine
WORKDIR /app/fe
RUN rm -rf .
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm run build
COPY . .