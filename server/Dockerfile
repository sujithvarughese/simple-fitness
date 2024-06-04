FROM node:alpine.18
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE PORT 3000
CMD ["npm", "run", "start"]