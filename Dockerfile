# Step 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Salin file penting saja untuk install dependensi
COPY package.json ./
RUN npm install

# Step 2: Build app
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Step 3: Jalankan app
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary standalone files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

# Gunakan node untuk menjalankan server.js
CMD ["node", "server.js"]