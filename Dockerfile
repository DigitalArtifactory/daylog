# Build stage
FROM node:24-alpine AS builder

# Install OpenSSL and other required dependencies
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# We don't run `npx prisma migrate deploy` here, because the `db` container is not available at build time.

# Final stage
FROM node:24-alpine

# Install OpenSSL in the final stage as well
RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /app /app

# Copy the entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +wxr /app/entrypoint.sh

# Install only what's necessary (you can use npm ci if you have a package-lock.json)
RUN npm install --omit=dev

# Prisma CLI if needed (optional, depends on how it's installed)
# RUN npm install -g prisma

# Expose the port
EXPOSE 3000

# Entrypoint that will run migrations and then start the app
ENTRYPOINT ["/app/entrypoint.sh"]
#CMD ["tail", "-f", "/dev/null"]
