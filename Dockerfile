FROM node:18.17-alpine3.17
WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
# Install dependencies
RUN npm install --production --silent
RUN npm install -g typescript
ENV NODE_ENV production

COPY . .
RUN npm run build
CMD npm run start
