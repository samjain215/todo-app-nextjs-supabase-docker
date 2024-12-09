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

# Build the application
RUN npm run build

# Production image, copy only necessary files and run
FROM node:18-alpine AS runner
WORKDIR /app

# ENV
ENV NEXT_PUBLIC_SUPABASE_URL=${sup_url}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY = ${sup_anon}
ENV NODE_ENV=${node_env}
ENV APP_URL=${app_url}

# Copy the built application and dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the application port
EXPOSE 3000

# Use the production build to start the app
CMD ["npm", "run", "start"]
