#!/bin/sh
echo "Esperando a que la base de datos esté disponible..."

# Esperar a que PostgreSQL esté listo (opcional si ya usas depends_on con healthcheck)
until nc -z db 5432; do
  echo "PostgreSQL aún no responde en db:5432..."
  sleep 2
done

echo "Base de datos disponible. Ejecutando migraciones Prisma..."

npx prisma migrate deploy

echo "Generando cliente Prisma..."

npx prisma generate

echo "Compilando aplicación..."

npm run build

echo "Iniciando aplicación..."

npm run start