FROM node:18-alpine
WORKDIR /home/node/app
COPY package*.json .
RUN npm ci --omit=dev
COPY . .
CMD ["npm", "start"]
EXPOSE 3000