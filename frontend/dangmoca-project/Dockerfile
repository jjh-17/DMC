FROM node:20.11.1-alpine
ARG VOLUME=/app
WORKDIR ${VOLUME}
COPY ./ ./
RUN npm install --legacy-peer-deps
RUN npm run build
ENTRYPOINT nginx -g daemon off