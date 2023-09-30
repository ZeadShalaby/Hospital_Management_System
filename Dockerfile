FROM alpine
WORKDIR /app
COPY . /app
RUN apk add --update nodejs
RUN apk add --update npm
CMD npm run start 
