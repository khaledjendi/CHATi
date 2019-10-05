# stage 1
# this stage is for building the app 
# it contains the tools to build and debug the app (ng commands)
FROM node:11.15.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm rebuild node-sass
RUN npm run build --prod

# stage 2
# this stage is for running the app 
# it contains the tools to run app with best performance
FROM nginx:alpine
COPY --from=node /app/dist/CHATi /usr/share/nginx/html