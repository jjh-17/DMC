FROM node:20.11.1-alpine
ARG VOLUME=/app
WORKDIR ${VOLUME}
RUN npm install --legacy-peer-deps
RUN npm run build
COPY ./ ./