FROM nginx
RUN rm /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
COPY /var/jenkins_home/workspace/DMC/frontend/dangmoca-project/dist /usr/share/nginx/html/
COPY /var/jenkins_home/workspace/env/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT nginx -g daemon off;