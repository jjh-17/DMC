FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY /jenkins/workspace/env/nginx.conf /etc/nginx/
COPY /var/jenkins_home/workspace/DMC/frontend/dangmoca-project/dist /usr/share/nginx/html/
ENTRYPOINT nginx -g daemon off;