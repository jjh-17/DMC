FROM node:20.11.1-alpine
ARG VOLUME=/app
WORKDIR ${VOLUME}
COPY package*.json ./
RUN npm install
RUN CI=false npm run build
COPY ./dist ./dist