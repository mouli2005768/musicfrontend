# ---------- Stage 1: Build ----------
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]


# ---------- Stage 2: Run ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy build output from Stage 1
COPY --from=builder /app/dist ./

# Expose nginx port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
