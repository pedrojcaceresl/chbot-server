# Use the official Node.js 18 image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package.json .
COPY yarn.lock .

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of your application code to the container
COPY . .

# Expose a port if your application listens on a specific port (e.g., 3000)
# EXPOSE 3000

# Define the command to run your application
CMD ["yarn", "start"]
