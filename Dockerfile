# Gunakan node sebagai base image
FROM node:18 as build

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json untuk instalasi dependensi
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Build proyek React
RUN npm run build

# Production stage
FROM node:18

# Set working directory
WORKDIR /app

# Salin hasil build proyek React ke dalam direktori server Express
COPY --from=build /app/build /app/public

# Salin file sertifikat SSL ke dalam container
COPY certificate.crt /app/certificate.crt
COPY private.key /app/private.key

# Salin file server.js ke dalam container
COPY server.js /app/server.js

# Install Express
RUN npm install express

# Expose port 443 untuk HTTPS
EXPOSE 80
EXPOSE 443

# Perintah untuk menjalankan server Express dengan HTTPS
CMD ["node", "server.js"]
