FROM nginx:alpine
# COPY source -> destination
COPY ./html/ /usr/share/nginx/html 
