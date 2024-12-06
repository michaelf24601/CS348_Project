# use node 20 to build
FROM node:20-alpine

# set working directory inside the container
WORKDIR /usr/src/app

# copy package.json and package-lock.json and clean install
COPY package*.json ./
RUN npm ci

# copy the rest of the application code
COPY . .

# expose the port the Express app runs on
EXPOSE 8080

RUN npm rebuild sqlite3

# 6. Start the Express app
CMD ["npm", "start"]
