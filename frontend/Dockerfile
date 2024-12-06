# use node 20 and alpine linux distro to build the app
FROM node:20-alpine AS build

# set the working directory inside the container 
WORKDIR /usr/src/app 

#copy the package.json and package-lock.json and install dependencies 
COPY package*.json ./
RUN npm ci 

#copy the rest of the code 
COPY . .

#build React frontend for production
RUN npm run build 

RUN echo "Build Output:" && ls -l /usr/src/app/dist

#use nginx image to serve the build files
FROM nginx:alpine 

#copy build output to the nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

#copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

#expose port 80 for the HTTP server
EXPOSE 80

#start nginx
CMD ["nginx", "-g", "daemon off;"]