FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build
RUN find ./build -type f | xargs gzip -k

FROM nginx
RUN mkdir -p /run/nginx/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/local/nginx/html/
EXPOSE 80

CMD nginx -g 'daemon off;'
