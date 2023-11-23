# Use a specific Node.js version
FROM node:18.0.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g prisma@latest && npm prune --production


# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your application will run
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GOOGLE_CALLBACK_URL=$GOOGLE_CALLBACK_URL

# Health check
HEALTHCHECK --interval=30s --timeout=5s \
    CMD curl -f http://localhost:3000 || exit 1

# Start the application
CMD ["node", "app.js"]
