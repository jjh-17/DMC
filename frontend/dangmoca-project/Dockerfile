FROM node:20.11.1-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install --save --legacy-peer-deps react react-dom react-scripts
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "run", "build"]