FROM node:22-alpine

WORKDIR /app

RUN npm install --global pm2

COPY package.json /app/

RUN npm install

COPY . .

RUN npm run build

CMD [ "pm2-runtime", "npm", "--", "start" ]
