FROM node:20.11.1-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENTRYPOINT ["npm","run","build"]