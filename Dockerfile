# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install Python and build tools for native dependencies
RUN apk add --no-cache python3 build-base

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run generate

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install Python and build tools for native dependencies
RUN apk add --no-cache python3 build-base

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma/ ./prisma

# Install PM2 globally
RUN npm install --global pm2


# Start the application
CMD ["pm2-runtime", "npm", "--", "start"]
