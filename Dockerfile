# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the backend port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
