# react
FROM node:16.14.0-alpine AS builder

WORKDIR /client

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

# nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=builder ./client/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
