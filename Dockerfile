# Use a smaller base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies with optimizations
RUN npm install --force --prefer-offline --no-audit --progress=false

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Set the default command to run your app
RUN npm run build

CMD ["npm", "run", "dev"]
