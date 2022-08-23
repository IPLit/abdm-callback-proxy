FROM nginx:latest

# Install dependencies
RUN apt-get update
RUN apt-get --assume-yes install vim
RUN apt-get --assume-yes install nginx-module-njs

# nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy source and html
COPY dist/njs.js /etc/nginx/njs/njs.js

COPY html/index.html /usr/share/nginx/html/index.html
