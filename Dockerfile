# Stage 1: Build React App
FROM node:lts-bullseye AS builder

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json untuk caching dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode proyek setelah dependencies di-install
COPY . .

# Build aplikasi React
RUN npm run build

# Stage 2: Serve dengan `serve`
FROM node:lts-bullseye AS runner

# Set working directory
WORKDIR /app

# Install `serve` untuk menyajikan aplikasi
RUN npm install -g serve

# Copy hanya hasil build dari tahap sebelumnya
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Jalankan aplikasi menggunakan `serve`
CMD ["serve", "-s", "build", "-l", "3000"]