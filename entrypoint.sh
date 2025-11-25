#!/bin/sh
# 99-inject-token.sh  ← this runs at container startup
# Replace placeholder in config.js
sed -i "s/replace_me/${CESIUM_TOKEN}/g" /usr/share/nginx/html/config.js

# Immediately delete the secret from environment
unset CESIUM_TOKEN

# Continue with normal nginx startup
exec "$@"