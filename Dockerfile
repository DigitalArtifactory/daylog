# Etapa de construcción
FROM node:24-alpine AS builder

# Instala OpenSSL y otras dependencias necesarias
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# No ejecutamos `npx prisma migrate deploy` aquí, porque el contenedor `db` no está disponible en tiempo de build.

# Etapa final
FROM node:24-alpine

# Instala OpenSSL en la etapa final también
RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /app /app

# Copiamos el entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +wxr /app/entrypoint.sh

# Instalamos solo lo necesario (puedes usar npm ci si tienes package-lock.json)
RUN npm install --omit=dev

# Prisma CLI si es necesario (opcional, depende de cómo esté instalado)
# RUN npm install -g prisma

# Expone el puerto
EXPOSE 3000

# Entrypoint que se encargará de correr migraciones y luego iniciar la app
ENTRYPOINT ["/app/entrypoint.sh"]
#CMD ["tail", "-f", "/dev/null"]
