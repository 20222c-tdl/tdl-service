FROM node:14.16-alpine as development
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV development

RUN apk add --no-cache --virtual build-dependencies make gcc g++ python git
RUN npm install -g @nestjs/cli

RUN npm install


COPY ./package*.json /app/
COPY ./ /app


RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:dev"]