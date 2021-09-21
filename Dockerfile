FROM node:10

# Create app directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN yarn install

EXPOSE 3000
CMD [ "yarn", "start" ]