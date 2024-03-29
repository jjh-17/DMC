FROM node:20.11.1-alpine
ARG VOLUME=/app
WORKDIR ${VOLUME}
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "start"]
