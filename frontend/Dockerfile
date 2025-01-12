# =========================
# 1) Build Stage
# =========================
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first
COPY package*.json ./
# (If using yarn, COPY package.json yarn.lock ./)

# Install dependencies
RUN npm install
# (If using yarn, RUN yarn install)

# Copy the rest of your source code
COPY . .

# Build the app for production (Vite outputs to `dist` by default)
RUN npm run build

# =========================
# 2) Production Stage
# =========================
FROM nginx:stable-alpine

# Remove existing static files (just to be safe)
RUN rm -rf /usr/share/nginx/html/*

# Copy the Vite production bundle from the `build` stage
# Note: Vite’s default output folder is `dist`
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 on the container
EXPOSE 3000

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
