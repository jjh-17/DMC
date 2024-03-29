FROM node:20.11.1-alpine
ARG VOLUME=/app
WORKDIR ${VOLUME}
RUN npm install
COPY package*.json
RUN npm run build
COPY ./dist ./dist