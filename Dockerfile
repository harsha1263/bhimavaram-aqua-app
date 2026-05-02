# Use the official Node image built on Alpine
FROM node:22-alpine3.21

# Apply latest security patches to the underlying Alpine OS
RUN apk update && apk upgrade --no-cache

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]