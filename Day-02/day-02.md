<h1 align="center">Day 02: Docker Deep Dive</h1>

<p align="center">
  <a href="../Day-01/day-01.md">« Day 01</a> | <a href="../README.md">Home</a> | <a href="../Day-03/day-03.md">Day 03 »</a>
</p>

---

## 🎯 Learning Objectives

By the end of today, you will be able to:

- Write efficient Dockerfiles
- Build custom Docker images
- Understand image layers and caching
- Use multi-stage builds for smaller images
- Work with Docker Compose for multi-container apps
- Apply Docker best practices

---

## 📚 Core Concepts

### What is a Dockerfile?

A **Dockerfile** is a text file containing instructions to build a Docker image. Each instruction creates a **layer** in the image, making images efficient to store and transfer.

### Dockerfile Instructions

| Instruction | Purpose | Example |
|-------------|---------|---------|
| `FROM` | Base image to build from | `FROM node:18-alpine` |
| `WORKDIR` | Set working directory | `WORKDIR /app` |
| `COPY` | Copy files from host to image | `COPY package*.json ./` |
| `ADD` | Copy files (supports URLs, tar extraction) | `ADD app.tar.gz /app` |
| `RUN` | Execute commands during build | `RUN npm install` |
| `ENV` | Set environment variables | `ENV NODE_ENV=production` |
| `ARG` | Build-time variables | `ARG VERSION=1.0` |
| `EXPOSE` | Document the port the container listens on | `EXPOSE 3000` |
| `CMD` | Default command when container starts | `CMD ["node", "server.js"]` |
| `ENTRYPOINT` | Configure container as executable | `ENTRYPOINT ["nginx"]` |
| `VOLUME` | Create mount point | `VOLUME /data` |
| `USER` | Set user for subsequent instructions | `USER node` |
| `LABEL` | Add metadata | `LABEL version="1.0"` |
| `HEALTHCHECK` | Container health check | `HEALTHCHECK CMD curl -f http://localhost/` |

### Image Layers

Each Dockerfile instruction creates a new layer:

```
┌─────────────────────────────────────────────┐
│           Final Image                       │
├─────────────────────────────────────────────┤
│  Layer 6: CMD ["node", "server.js"]         │ ← Metadata only
├─────────────────────────────────────────────┤
│  Layer 5: COPY . .                          │ ← Application code
├─────────────────────────────────────────────┤
│  Layer 4: RUN npm install                   │ ← Dependencies
├─────────────────────────────────────────────┤
│  Layer 3: COPY package*.json ./             │ ← Package files
├─────────────────────────────────────────────┤
│  Layer 2: WORKDIR /app                      │ ← Create directory
├─────────────────────────────────────────────┤
│  Layer 1: FROM node:18-alpine               │ ← Base image
└─────────────────────────────────────────────┘
```

### Layer Caching

Docker caches layers to speed up builds:
- If a layer hasn't changed, Docker uses the cached version
- When a layer changes, all subsequent layers are rebuilt
- **Order matters!** Put frequently changing layers last

### Multi-stage Builds

Multi-stage builds help create smaller production images:

```dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Benefits:
- Final image only contains what's needed to run
- Build tools stay in the build stage
- Dramatically smaller image sizes

---

## ⌨️ Docker Commands

### Building Images

```bash
# Build image from Dockerfile in current directory
docker build -t myapp:1.0 .

# Build with different Dockerfile
docker build -t myapp:1.0 -f Dockerfile.prod .

# Build with build arguments
docker build --build-arg VERSION=2.0 -t myapp:2.0 .

# Build without cache
docker build --no-cache -t myapp:1.0 .

# Build and show all output
docker build --progress=plain -t myapp:1.0 .
```

### Managing Images

```bash
# List images
docker images

# View image history (layers)
docker history myapp:1.0

# Inspect image details
docker inspect myapp:1.0

# Remove image
docker rmi myapp:1.0

# Tag image
docker tag myapp:1.0 myapp:latest

# Push to registry
docker push username/myapp:1.0

# Save image to file
docker save -o myapp.tar myapp:1.0

# Load image from file
docker load -i myapp.tar
```

### Docker Compose Commands

```bash
# Start services
docker compose up

# Start in detached mode
docker compose up -d

# Build and start
docker compose up --build

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v

# View logs
docker compose logs

# Follow logs
docker compose logs -f

# List containers
docker compose ps

# Execute command in service
docker compose exec web bash

# Scale a service
docker compose up -d --scale web=3
```

---

## 📄 Practical Examples

### Example 1: Node.js Application Dockerfile

**Project structure:**
```
myapp/
├── Dockerfile
├── package.json
├── package-lock.json
└── src/
    └── server.js
```

**server.js:**
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello from Docker!', version: '1.0' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

**package.json:**
```json
{
  "name": "docker-demo",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**Dockerfile:**
```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source
COPY src/ ./src/

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start application
CMD ["node", "src/server.js"]
```

**Build and run:**
```bash
# Build the image
docker build -t node-demo:1.0 .

# Run the container
docker run -d -p 3000:3000 --name my-node-app node-demo:1.0

# Test it
curl http://localhost:3000
curl http://localhost:3000/health
```

### Example 2: Multi-stage Build for React App

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /health {
            return 200 'healthy';
            add_header Content-Type text/plain;
        }
    }
}
```

### Example 3: Python Flask Application

```dockerfile
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m -r appuser && chown -R appuser /app
USER appuser

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

### Example 4: Docker Compose for Multi-Container App

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  # Frontend - React application
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - app-network

  # Backend - Node.js API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=mongodb://mongo:27017/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
    networks:
      - app-network

  # MongoDB Database
  mongo:
    image: mongo:6
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"
    networks:
      - app-network

  # Redis Cache
  redis:
    image: redis:alpine
    volumes:
      - redis-data:/data
    ports:
      - "6379:6379"
    networks:
      - app-network

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

volumes:
  mongo-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

**Usage:**
```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f backend

# Scale backend to 3 instances
docker compose up -d --scale backend=3

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v
```

---

## 🔧 Hands-on Exercises

### Exercise 1: Build Your First Image

**Task:** Create a simple Node.js application and containerize it.

**Steps:**

1. Create project structure:
```bash
mkdir my-first-image && cd my-first-image
```

2. Create `package.json`:
```json
{
  "name": "my-first-image",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

3. Create `index.js`:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: 'My First Docker Image!',
        timestamp: new Date().toISOString()
    }));
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

4. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY index.js .
EXPOSE 3000
CMD ["npm", "start"]
```

5. Build and run:
```bash
docker build -t my-first-image:1.0 .
docker run -d -p 3000:3000 --name first-container my-first-image:1.0
curl http://localhost:3000
```

---

### Exercise 2: Optimize with Multi-stage Build

**Task:** Convert the previous exercise to use multi-stage build.

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY index.js .
COPY package.json .

# Use non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000
CMD ["node", "index.js"]
```

Compare image sizes:
```bash
docker images | grep my-first-image
```

---

### Exercise 3: Docker Compose Application

**Task:** Create a web application with Redis counter.

1. Create project structure:
```bash
mkdir compose-demo && cd compose-demo
mkdir app
```

2. Create `app/index.js`:
```javascript
const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    url: 'redis://redis:6379'
});

client.connect();

app.get('/', async (req, res) => {
    const visits = await client.incr('visits');
    res.json({
        message: 'Hello from Docker Compose!',
        visits: visits
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});
```

3. Create `app/package.json`:
```json
{
  "name": "compose-demo",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "express": "^4.18.2",
    "redis": "^4.6.8"
  }
}
```

4. Create `app/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

5. Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    build: ./app
    ports:
      - "3000:3000"
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:alpine
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  redis-data:
```

6. Run the application:
```bash
docker compose up -d
curl http://localhost:3000  # Run multiple times to see counter increase
```

---

### Exercise 4: Build Arguments and Environment Variables

**Task:** Create a configurable Dockerfile using ARG and ENV.

```dockerfile
# Build argument with default value
ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine

# Environment variables
ENV APP_NAME="My Configurable App"
ENV APP_PORT=3000

WORKDIR /app

COPY package.json .
COPY index.js .

EXPOSE ${APP_PORT}

CMD ["sh", "-c", "echo Starting $APP_NAME on port $APP_PORT && node index.js"]
```

Build with different versions:
```bash
# Build with Node 18 (default)
docker build -t myapp:node18 .

# Build with Node 20
docker build --build-arg NODE_VERSION=20 -t myapp:node20 .

# Run with custom environment
docker run -d -p 3000:3000 -e APP_NAME="Production App" myapp:node18
```

---

## 🌍 Real-world Scenarios

### Scenario 1: CI/CD Pipeline Image

**Problem:** Need consistent build environment for CI/CD.

**Solution:** Create a build image with all tools:

```dockerfile
FROM ubuntu:22.04

# Install build tools
RUN apt-get update && apt-get install -y \
    curl \
    git \
    make \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Docker CLI
RUN curl -fsSL https://get.docker.com | sh

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install Helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

WORKDIR /workspace
```

### Scenario 2: Development vs Production Images

**Problem:** Need different configurations for dev and prod.

**Development Dockerfile (Dockerfile.dev):**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install nodemon for hot reload
RUN npm install -g nodemon

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["nodemon", "src/server.js"]
```

**Production Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN adduser -D appuser
USER appuser

EXPOSE 3000

CMD ["node", "src/server.js"]
```

### Scenario 3: Database Migration Container

**Problem:** Need to run database migrations before app starts.

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data

  migrate:
    build:
      context: .
      dockerfile: Dockerfile.migrate
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/myapp
    # Run once and exit
    restart: "no"

  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      migrate:
        condition: service_completed_successfully
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/myapp

volumes:
  postgres-data:
```

---

## ✅ Validation Steps

| # | Task | Command | Expected Result |
|---|------|---------|-----------------|
| 1 | Build image | `docker build -t test:1.0 .` | Successfully built |
| 2 | Image created | `docker images \| grep test` | Shows image with tag |
| 3 | Container runs | `docker run -d -p 3000:3000 test:1.0` | Container ID returned |
| 4 | App responds | `curl localhost:3000` | Valid JSON response |
| 5 | Compose up | `docker compose up -d` | All services started |
| 6 | Compose ps | `docker compose ps` | All services running |
| 7 | Multi-stage build | Compare image sizes | Production image smaller |

### Clean Up
```bash
# Stop and remove containers
docker compose down -v

# Remove built images
docker rmi $(docker images -q 'test*')

# Prune unused resources
docker system prune -f
```

---

## 📝 Summary

| Topic | Key Takeaways |
|-------|---------------|
| **Dockerfiles** | Blueprint for building images, each instruction creates a layer |
| **Layer Caching** | Order matters; put frequently changing layers last |
| **Multi-stage Builds** | Separate build and runtime for smaller images |
| **Docker Compose** | Define and run multi-container applications |
| **Best Practices** | Use specific tags, non-root users, health checks |

### Dockerfile Best Practices

1. ✅ Use specific base image tags (not `latest`)
2. ✅ Order layers from least to most frequently changed
3. ✅ Combine RUN commands to reduce layers
4. ✅ Use multi-stage builds for smaller images
5. ✅ Run as non-root user
6. ✅ Use `.dockerignore` to exclude files
7. ✅ Add HEALTHCHECK for container health monitoring
8. ✅ Use COPY instead of ADD when possible

---

## ➡️ What's Next?

Tomorrow in **Day 03: Kubernetes Overview**, we'll cover:
- What is Kubernetes and why use it
- Container orchestration concepts
- Kubernetes vs other orchestrators
- Key Kubernetes terminology
- When to use (and not use) Kubernetes

---

<p align="center">
  <a href="../Day-01/day-01.md">« Day 01</a> | <a href="../README.md">Home</a> | <a href="../Day-03/day-03.md">Day 03 »</a>
</p>

<p align="center">
  <strong>🧡 Happy Learning! 🧡</strong>
</p>
