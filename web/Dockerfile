FROM node:alpine as BUILDER

WORKDIR /usr/web

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=BUILDER /usr/web/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]