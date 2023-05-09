FROM node:alpine as BUILDER

WORKDIR /usr/api

COPY package*.json .

RUN npm install --only=dev

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /usr/api

RUN mkdir build
RUN mkdir migrations

COPY --from=BUILDER /usr/api/build/* build
COPY --from=BUILDER /usr/api/migrations/* migrations
COPY --from=BUILDER /usr/api/.env .
COPY --from=BUILDER /usr/api/database.json .
COPY --from=BUILDER /usr/api/package*.json .

RUN npm install --only-prod 

EXPOSE 3333

CMD npx db-migrate up;npm start