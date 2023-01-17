FROM node:14-alpine
WORKDIR /app
COPY package.json /app/package.json
RUN npm install && npm install pm2 -g && mkdir -p /var/log/node
COPY . /app
RUN npm run build:dev
CMD ["npm", "run", "serve:dev"]

