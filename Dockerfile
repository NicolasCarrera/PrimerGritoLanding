FROM node:22-alpine AS base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]