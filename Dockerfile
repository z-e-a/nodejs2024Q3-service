FROM node:lts-alpine
# ENV NODE_ENV=production
WORKDIR /usr/src/app
EXPOSE 4000
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# COPY package*.json .
# RUN npm install --production --silent && mv node_modules ../
# RUN npm install --force && mv node_modules ../
# RUN npm install --force
# RUN npm ci && mv node_modules ../
# COPY . .
# RUN apk update && apk add bash
RUN npm i -g @nestjs/cli
# RUN chown -R node /usr/src/app
# USER node
# RUN npx prisma migrate dev --name init
# RUN npx prisma migrate deploy
# RUN npx prisma migrate deploy
# CMD ["npm", "start"]
# CMD ["npm", "run", "start:dev"]
# CMD ["npx @nestjs/cli", "start"]
# CMD ["/bin/bash"]
