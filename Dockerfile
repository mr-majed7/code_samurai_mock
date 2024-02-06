FROM node:latest

ENV PORT=5000
ENV MONGODB_URI=

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY .. .

EXPOSE 5000

CMD ["npm", "run", "prod"]

