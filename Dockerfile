FROM node:12

# Create app directory, this is in our container/in out image
WORKDIR /adm/src/app

#Install app dependencies

COPY package*.json ./

RUN npm Install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8080
CMD ["node","dist/main"]