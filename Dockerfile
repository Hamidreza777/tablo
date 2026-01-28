# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# محیط کار
WORKDIR /app

# npm mirror برای ایران
RUN npm config set registry https://registry.npmmirror.com

# کپی package.json و package-lock.json
COPY package*.json ./

# نصب همه وابستگی‌ها (dev + prod)
RUN npm ci --fetch-timeout=60000 --fetch-retries=5

# کپی کل پروژه
COPY . .

# ساخت پروژه
RUN npm run build

# ---------- Stage 2: Production ----------
FROM node:20-alpine AS production

WORKDIR /app

# npm mirror برای production هم
RUN npm config set registry https://registry.npmmirror.com

# فقط وابستگی‌های production نصب میشن
COPY package*.json ./
RUN npm ci --only=production

# کپی خروجی build از مرحله قبل
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# پورت
EXPOSE 3000

# اجرای اپلیکیشن
CMD ["npm", "start"]
