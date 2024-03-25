FROM node
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 80
CMD ["npm", "start"]