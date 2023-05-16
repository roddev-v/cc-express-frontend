FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/cc-express-frontend /usr/share/nginx/html
COPY ./nginx.conf ./conf.d/default.conf

EXPOSE 80
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]
