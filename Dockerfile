# Install node v14
FROM node:14

# Set the workdir /app
WORKDIR /app

# Copy application source
COPY . .

# Run npm install - install the npm dependencies
RUN npm install

# Expose application ports - (3000 for API and 9229 for debug)
EXPOSE 3000 9229

# Start the application
CMD ["npm", "start"]
