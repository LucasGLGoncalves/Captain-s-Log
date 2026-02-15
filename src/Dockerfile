FROM node:25.6.1-alpine3.23
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]