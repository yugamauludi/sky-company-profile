# Step 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Salin file penting saja untuk install dependensi
COPY package*.json ./
RUN npm ci

# Step 2: Build app
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV production


COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Step 3: Jalankan app
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files only
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/src ./src

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]