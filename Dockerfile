# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./
RUN npm ci --force

# Rebuild the application only when source files change
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Set environment variables
ENV NEXT_PUBLIC_SUPABASE_URL="https://riphhkiyyflheyjdrfqu.supabase.co"
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGhoa2l5eWZsaGV5amRyZnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4Nzk1NTMsImV4cCI6MjA0NzQ1NTU1M30.n0V7HNeRnH7tUvZZrS73wRLroHcszeKVCEVnCNfAGDY"
ENV NODE_ENV="production"

# Build the application
RUN npm run build

# Production image, copy only necessary files and run
FROM node:18-alpine AS runner
WORKDIR /app

# Copy the built application and dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the application port
EXPOSE 3000

# Use the production build to start the app
CMD ["npm", "run", "start"]
