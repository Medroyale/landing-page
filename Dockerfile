FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV NODE_ENV=production
RUN npm run build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN rm -rf ./*

COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add --no-cache gzip
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]