FROM node:20.11.1-alpine
ARG VOLUME=/app
WORKDIR ${VOLUME}
COPY package*.json ./
RUN npm install
RUN yarn install
RUN yarn run build
COPY ./dist ./dist