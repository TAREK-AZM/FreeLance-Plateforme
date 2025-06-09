# Development stage (with live reload)
FROM node:18-alpine AS dev
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Production build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Production server
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .
EXPOSE 3000
CMD ["npm", "run", "preview"]