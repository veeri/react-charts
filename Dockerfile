# # Step 1: Build the React app
# FROM node:18 AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --legacy-peer-deps

# COPY . .
# RUN npm run build

# EXPOSE 3000:3000
# CMD ["npm", "start"]


# Step 1: Build React app
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source code
COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

# Build optimized production version
RUN npm run build


# Step 2: Serve app with Nginx
FROM nginx:alpine

# Copy build output to Nginx html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
