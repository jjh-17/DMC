FROM node:20.11.1-alpine
ARG VOLUME=/app
WORKDIR ${VOLUME}
RUN npm run build
COPY ./dist ./
ENTRYPOINT nginx -g daemon off