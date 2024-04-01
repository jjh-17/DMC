FROM node:20.12.0-alpine3.18 as vite
WORKDIR /app/client
COPY ./client .

RUN npm install
RUN npm run build

FROM nginx

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY ./nginx/nginx.conf /etc/nginx
COPY --from=vite ./app/client/dist /usr/share/nginx/html

ENTRYPOINT nginx -g daemon off;