# Dockerfile — ONLY this (no entrypoint.sh, no extra script)
FROM nginx:alpine

COPY ./html/ /usr/share/nginx/html/
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# This makes the official script replace ${CESIUM_TOKEN}
ENV NGINX_ENVSUBST_TEMPLATE_SUFFIX=".template"

EXPOSE 80