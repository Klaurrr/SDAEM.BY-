FROM node:19-alpine
WORKDIR /app
EXPOSE 3003

COPY package.json package.json

RUN npm install

COPY . .

CMD ["node", "index"]