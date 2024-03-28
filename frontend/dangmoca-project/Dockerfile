FROM node:20.11.1-alpine
WORKDIR /app/fe
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENTRYPOINT ["npm","run","build"]