FROM node:20.12.0-alpine3.18
ARG DEFAULT_CONF
ENV CONF_DIR=${DEFAULT_ENV:-/var/jenkins_home/workspace/env/nginx.conf}
COPY CONF_DIR /etc/nginx/conf.d/nginx.conf
ARG DEFAULT_DIST
ENV DIST_DIR=${DEFAULT_ARG:-./dist/}
ARG DEFAULT_NGINX
ENV DIST_NGINX=${DEFAULT_NGINX:/usr/share/nginx/html/}
COPY DIST_DIR DIST_NGINX
EXPOSE 80
ENTRYPOINT nginx -g daemon off;