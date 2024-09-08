# Etapa 1: Dependências
FROM node:18-alpine AS base
WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

# Copiar arquivos de dependências
COPY package.json yarn.lock* ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Etapa 2: Build
FROM base AS builder
WORKDIR /app

# Copiar todo o código fonte
COPY . .

# Build de produção
RUN yarn build

# Etapa 3: Imagem final para rodar o Next.js
FROM node:18-alpine AS runner
WORKDIR /app

# Definir variáveis de ambiente
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Criar usuário não privilegiado
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar os arquivos necessários da build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Permissões para o usuário não privilegiado
RUN chown -R nextjs:nodejs /app

# Usar o usuário não privilegiado
USER nextjs

# Expor a porta
EXPOSE 3000

# Rodar a aplicação Next.js
CMD ["npx", "next", "start"]
