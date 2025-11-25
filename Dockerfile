FROM nginx:alpine

COPY ./html/ /usr/share/nginx/html/
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# This makes the official envsubst run on .template files
ENV NGINX_ENVSUBST_TEMPLATE_SUFFIX=".template"

# This makes $CESIUM_TOKEN available at runtime for sub_filter
ARG CESIUM_TOKEN
ENV CESIUM_TOKEN=$CESIUM_TOKEN