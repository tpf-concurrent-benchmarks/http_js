FROM node:20.12.2

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json ./

COPY src ./src
RUN npm run build

CMD ["npm", "start"]
