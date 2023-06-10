# Use the official Node.js 14.x base image
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install
 
COPY . .

EXPOSE 8080

CMD ["npm", "start"]