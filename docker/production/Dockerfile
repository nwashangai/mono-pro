FROM node:14.19.0

WORKDIR /app

# RUN npm install --g yarn
RUN npm i npm@latest -g
RUN npm install -g lerna
COPY package.json /app
COPY yarn.lock /app
ENV NODE_ENV=development

RUN yarn install

COPY . .

RUN yarn bootstrap
EXPOSE 4000
CMD ["yarn", "start"]
