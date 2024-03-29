FROM node:20.11.1-alpine
ARG VOLUME=/app
WORKDIR ${VOLUME}
COPY package*.json ./
RUN npm init vite
RUN npm install --legacy-peer-deps
RUN npm run build
COPY ./dist ./
ENTRYPOINT nginx -g daemon off