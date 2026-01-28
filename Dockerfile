# از تصویر رسمی Node.js استفاده می‌کنیم
FROM node:20-alpine

# دایرکتوری کار را ایجاد می‌کنیم
WORKDIR /app

# ابتدا package.json و package-lock.json را کپی می‌کنیم
COPY package*.json ./

# وابستگی‌ها را نصب می‌کنیم
RUN npm ci --only=production

# بقیه فایل‌های پروژه را کپی می‌کنیم
COPY . .

# برنامه را build می‌کنیم
RUN npm run build

# پورت مورد نظر
EXPOSE 3000

# دستور اجرای برنامه
CMD ["npm", "start"]