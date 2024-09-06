FROM node:20-alpine

WORKDIR /frontend

COPY ./frontend/package*.json ./
RUN npm config set legacy-peer-deps true
RUN npm ci --silent

COPY ./frontend/ .
RUN npm run build

EXPOSE 3333
CMD ["npm", "start"]
