#!/bin/sh
echo "Waiting for the database to be available..."

# Wait until PostgreSQL is ready (optional if you're already using depends_on with healthcheck)
until nc -z db 5432; do
  echo "PostgreSQL is still not responding on db:5432..."
  sleep 2
done

echo "Database is available. Running Prisma migrations..."

npx prisma migrate deploy

echo "Generating Prisma client..."

npx prisma generate

echo "Building application..."

npm run build

echo "Starting application..."

npm run start
