FROM node:latest

ENV PORT=5000
ENV MONGODB_URI=mongodb+srv://code_samurai:ZIfybXRnz64yiQPF@cluster0.ffsxpkt.mongodb.net/?retryWrites=true&w=majority

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY .. .

EXPOSE 5000

CMD ["npm", "run", "prod"]

