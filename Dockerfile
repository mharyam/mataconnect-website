# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml into the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
