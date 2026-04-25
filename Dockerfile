# 1. Use an official, lightweight Node.js image as the base
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy the package.json files first (for efficient caching)
COPY package*.json ./

# 4. Install the dependencies (express, mysql2, dotenv)
RUN npm install

# 5. Copy all your application code into the container
COPY . .

# 6. Expose the port your server.js uses
EXPOSE 8080

# 7. The command to start your application
CMD ["node", "server.js"]