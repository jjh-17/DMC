FROM node:20.11.1-alpine
ARG VOLUME=/app
WORKDIR ${VOLUME}
COPY package*.json ./
RUN npm install
COPY package.json package-lock.json .npmrc ./
RUN npm run build
COPY ./dist ./dist