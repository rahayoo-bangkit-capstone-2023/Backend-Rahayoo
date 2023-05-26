# Use the official Node.js 14.x base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files to the working directory
COPY . .

# Expose the port on which your app listens (default is 3000)
EXPOSE 3000

# Specify the command to start your app
CMD ["npm", "start"]
