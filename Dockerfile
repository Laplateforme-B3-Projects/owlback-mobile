FROM node:22-alpine

RUN apk add --no-cache git
WORKDIR /app

COPY package*.json ./

RUN npm install -g @expo/ngrok@^4.1.0

COPY . ./

RUN npm install

CMD ["npx", "expo", "start", "--tunnel", "-c"]