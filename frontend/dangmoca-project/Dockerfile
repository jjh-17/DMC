FROM node:20.11.1-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY . .
ENTRYPOINT ["npm", "run", "build"]