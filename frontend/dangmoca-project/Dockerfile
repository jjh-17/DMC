FROM nginx
RUN rm -f /usr/share/nginx/html/*
COPY /jenkins/workspace/DMC/frontend/dangmoca-project/dist /usr/share/nginx/html/
RUN rm -f /etc/nginx/conf.d/default.conf
COPY /jenkins/workspace/env/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT nginx -g daemon off;