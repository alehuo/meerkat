FROM node:10.19-alpine

WORKDIR /app

COPY package*.json tsconfig.json .eslintrc.js ./

RUN npm install && \
    npm run build && \
    npm prune --production

CMD ["npm", "start"]