FROM node:10.19-alpine AS client

WORKDIR /app/client
COPY ./client/package*.json ./client/tsconfig.json ./

RUN npm install

COPY ./client/src ./src
COPY ./client/public ./public

RUN npm run build

FROM node:10.19-alpine

WORKDIR /app/server

COPY ./server/package*.json ./server/tsconfig.json ./server/.eslintrc.js ./

RUN npm install

COPY ./server/src ./src

RUN npm run build && \
    npm prune --production

COPY --from=client /app/client/build /app/client/build

CMD ["npm", "start"]