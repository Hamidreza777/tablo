# ---------- Stage 1: Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

# استفاده از mirror برای ایران
RUN npm config set registry https://registry.npmmirror.com

# فقط package.json و package-lock.json
COPY package*.json ./

# نصب تمام وابستگی‌ها (dev + prod)
RUN npm ci --fetch-timeout=60000 --fetch-retries=5

# کپی پروژه
COPY . .

# Build پروژه Next.js
RUN npm run build

# ---------- Stage 2: Production ----------
FROM node:20-alpine AS production

WORKDIR /app

# استفاده از mirror
RUN npm config set registry https://registry.npmmirror.com

# فقط prod dependencies نصب میشن
COPY package*.json ./
RUN npm ci --only=production

# کپی خروجی build از مرحله builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# پورت
EXPOSE 3000

# اجرای اپلیکیشن
CMD ["npm", "start"]
