FROM node:20.11.1-alpine
RUN mkdir /app
WORKDIR /app
RUN npm install --save --legacy-peer-deps react react-dom react-scripts
COPY package*.json ./
COPY . .
ENTRYPOINT ["npm", "run", "build"]