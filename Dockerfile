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

# Add environment variables
ENV NEXT_PUBLIC_SUPABASE_URL="https://riphhkiyyflheyjdrfqu.supabase.co"
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGhoa2l5eWZsaGV5amRyZnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4Nzk1NTMsImV4cCI6MjA0NzQ1NTU1M30.n0V7HNeRnH7tUvZZrS73wRLroHcszeKVCEVnCNfAGDY"

# Expose the application port
EXPOSE 3000

# Set the default command to run your app
RUN npm cache clean --force
RUN npm run build

CMD ["npm", "run", "dev"]
