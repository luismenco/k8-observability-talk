FROM node:latest as base

WORKDIR /code

# COPY package.json package.json
# COPY package-lock.json package-lock.json
COPY . .
RUN npm i

# CMD  node app.js
CMD  node -r "./utils/tracing.js" app.js