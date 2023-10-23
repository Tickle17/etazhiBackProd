FROM --platform=linux/amd64 node:18.8.0-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY src /app/src


EXPOSE 5001

CMD ["npm","start"]
