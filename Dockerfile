FROM node:22

WORKDIR /app

# Copy package files from backend directory
COPY backend/package.json backend/package-lock.json ./
RUN npm install

RUN npm install -g nodemon

# Copy the rest of the backend code
COPY backend/ .

EXPOSE 3000

CMD ["nodemon", "server.js"]