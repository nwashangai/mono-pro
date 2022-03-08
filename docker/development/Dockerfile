FROM node:14.19.0

WORKDIR /app

# RUN npm install --g yarn
RUN npm i npm@latest -g
RUN npm install -g lerna
# RUN pip3 install --upgrade pip setupyarn bootstraptools passporteye
# COPY ["package.json", "yarn.lock", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY package.json /app
ENV NODE_ENV=development

RUN yarn install

COPY . .

RUN yarn bootstrap
EXPOSE 4000
# RUN chmod +x /app/mongo-init.sh
# ENTRYPOINT ["/app/mongo-init.sh"]
CMD ["yarn", "dev"]
