# Use a base image with Node.js installed
FROM node:20.16.0-alpine

# ENV PORT=5001
ENV PORT=5000
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=mawaddah_dev"
ENV JWTSECRET="MAWADDAHINDONESIA"

# PRISMA
# ENV DATABASE_URL="mysql://root:my-secret-pw@db-ecourse-rehab-hati:3306/ecourse"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci --verbose

# Copy the rest of the application code
COPY . .

# EXPOSE ${PORT}

# Command to run your application
CMD npx prisma migrate reset --force && npm run migrate:deploy && npm run start
# CMD npm run start
# CMD npx prisma generate && npm run migrate:deploy && npm run start
