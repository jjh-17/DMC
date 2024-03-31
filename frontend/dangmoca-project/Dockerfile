FROM node:20.12.0-alpine3.18 as build
ARG DEFAULT_ARG
ENV DOCKER_FRONT_VOLUME=${DEFAULT_ARG:-/app}
WORKDIR ${DOCKER_FRONT_VOLUME}
COPY ./ ./
RUN npm install
RUN npm run build
CMD ls -al
COPY ./ /app

FROM nginx
ARG DEFAULT_ARG
ENV DOCKER_FRONT_VOLUME=${DEFAULT_ARG:-/app}
COPY --from=build ${DOCKER_FRONT_VOLUME}/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT nginx -g daemon off;