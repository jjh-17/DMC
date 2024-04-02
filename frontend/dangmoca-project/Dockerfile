FROM nginx
COPY /jenkins/workspace/env/default.conf /etc/nginx/conf.d/default.conf
COPY /jenkins/workspace/DMC/frontend/dangmoca-project/dist /usr/share/nginx/html/
ENTRYPOINT nginx -g daemon off;