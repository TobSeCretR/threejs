FROM nginx:alpine

# Copy the website
COPY ./html/ /usr/share/nginx/html/

# Custom nginx config with env substitution
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# This enables $CESIUM_ION_TOKEN substitution at container startup
ENV CESIUM_ION_TOKEN=replace_me