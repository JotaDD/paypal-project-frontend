FROM node:20.9-alpine3.17

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 4173

RUN npm run build

CMD ["npm", "run", "preview"]