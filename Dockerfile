FROM node:alpine as build

WORKDIR /app

COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json

RUN yarn

COPY ./src ./src
COPY ./public ./public

RUN yarn build

FROM nginx:stable

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]
