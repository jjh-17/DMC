FROM nginx
CMD echo "test"
RUN rm /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html/
COPY /var/jenkins_home/workspace/env/default.conf /etc/nginx/conf.d/default.conf
CMD echo "test"
ENTRYPOINT nginx -g daemon off;