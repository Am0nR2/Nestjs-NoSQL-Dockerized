FROM node:alpine AS DEVELOPMENT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

FROM node:alpine AS PRODUCTION

ARG NODE_ENV=PRODUCTION
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=prod

COPY . .

COPY --from=DEVELOPMENT /usr/src/app/dist ./dist

CMD [ "node", "dist/main"]
