FROM node:22-alpine
LABEL org.opencontainers.image.source=https://github.com/c3pobot/mongo-tools
WORKDIR /app
ENV NODE_PATH=/app
RUN apk update && \
  # wrap process in --init in order to handle kernel signals
  # https://github.com/krallin/tini#using-tini
  apk add --no-cache tini && \
  rm -rf /var/cache/apk/*

COPY --from=builder node_modules node_modules/
COPY package*.json ./
COPY index.js index.js
COPY src ./src
RUN npm install -g nodemon
USER node
ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "nodemon", "--trace-warnings", "./index.js"  ]
