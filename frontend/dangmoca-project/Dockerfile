FROM nginx
RUN rm -f /usr/share/nginx/html/*
COPY ./dist /usr/share/nginx/html/
RUN rm -f /etc/nginx/conf.d/default.conf
COPY /var/jenkins_home/workspace/env/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT nginx -g daemon off;