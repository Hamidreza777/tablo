# ---------- Stage 1: Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./

# نصب **همه** وابستگی‌ها (dev + prod)
RUN npm ci --fetch-timeout=60000 --fetch-retries=5

COPY . .

RUN npm run build

# ---------- Stage 2: Production ----------
FROM node:20-alpine AS production

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./

# فقط prod dependencies
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
