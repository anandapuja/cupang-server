# Use the official Bun image with Debian Linux
# Oven is the company name, the creator of Bun
# FROM oven/bun:alpine

# # Create and change to the app directory
# WORKDIR /usr/src/app

# # Copy app files
# COPY . .

# # Install app dependencies
# RUN bun install

# # Run the application

FROM oven/bun

WORKDIR /app

COPY . /app

RUN bun install

COPY prisma ./prisma/

COPY . .

RUN bunx prisma generate

RUN bunx prisma db seed

CMD ["bun", "start"]
