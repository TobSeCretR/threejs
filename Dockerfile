FROM nginx:alpine

# Copy the website
COPY ./html/ /usr/share/nginx/html/

# Copy the template config
#COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# This is the magic line — tells the official entrypoint to substitute env vars
ARG CESIUM_TOKEN
ENV CESIUM_TOKEN=$CESIUM_TOKEN

ENV NGINX_ENVSUBST_TEMPLATE_SUFFIX=".template"

EXPOSE 80


