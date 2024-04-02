FROM nginx
COPY /jenkins/workspace/DMC/frontend/dangmoca-project/dist /usr/share/nginx/html
RUN rm -f /etc/nginx/conf.d/default.conf
COPY /jenkins/workspace/env/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]