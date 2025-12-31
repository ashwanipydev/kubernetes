<h1 align="center">Day 01: Introduction to Containers</h1>

<p align="center">
  <a href="../README.md">« Home</a> | <a href="../Day-02/day-02.md">Day 02 »</a>
</p>

---

## 🎯 Learning Objectives

By the end of today, you will be able to:

- Explain the difference between containers and virtual machines
- Understand why containers became popular
- Install Docker on your machine
- Run your first container
- Understand the container lifecycle
- Execute basic Docker commands

---

## 📚 Core Concepts

### What is a Container?

A **container** is a lightweight, standalone, executable package that includes everything needed to run a piece of software:

- Application code
- Runtime environment
- System tools
- Libraries
- Configuration settings

Think of a container as a **portable box** that contains your application and all its dependencies, ensuring it runs the same way everywhere—on your laptop, in testing, or in production.

### Containers vs Virtual Machines

Understanding the difference between containers and VMs is fundamental:

| Aspect | Virtual Machines | Containers |
|--------|------------------|------------|
| **Architecture** | Run on hypervisor with full guest OS | Share host OS kernel |
| **Size** | Gigabytes (includes full OS) | Megabytes (just app + dependencies) |
| **Startup Time** | Minutes | Seconds |
| **Resource Usage** | Heavy (full OS overhead) | Lightweight |
| **Isolation** | Strong (hardware-level) | Process-level |
| **Portability** | Limited by hypervisor | Highly portable |
| **Density** | ~10-20 VMs per host | 100s-1000s containers per host |

### Visual Comparison

```
┌─────────────────────────────────────┐    ┌─────────────────────────────────────┐
│         VIRTUAL MACHINES            │    │           CONTAINERS                │
├─────────────────────────────────────┤    ├─────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐            │    │  ┌─────┐ ┌─────┐ ┌─────┐            │
│  │App A│ │App B│ │App C│            │    │  │App A│ │App B│ │App C│            │
│  ├─────┤ ├─────┤ ├─────┤            │    │  ├─────┤ ├─────┤ ├─────┤            │
│  │Bins │ │Bins │ │Bins │            │    │  │Bins │ │Bins │ │Bins │            │
│  │Libs │ │Libs │ │Libs │            │    │  │Libs │ │Libs │ │Libs │            │
│  ├─────┤ ├─────┤ ├─────┤            │    │  └─────┴─┴─────┴─┴─────┘            │
│  │Guest│ │Guest│ │Guest│            │    │  ┌────────────────────┐             │
│  │ OS  │ │ OS  │ │ OS  │            │    │  │   Container Engine │             │
│  └─────┴─┴─────┴─┴─────┘            │    │  │      (Docker)      │             │
│  ┌─────────────────────┐            │    │  └────────────────────┘             │
│  │     Hypervisor      │            │    │  ┌────────────────────┐             │
│  └─────────────────────┘            │    │  │      Host OS       │             │
│  ┌─────────────────────┐            │    │  └────────────────────┘             │
│  │      Host OS        │            │    │  ┌────────────────────┐             │
│  └─────────────────────┘            │    │  │    Infrastructure  │             │
│  ┌─────────────────────┐            │    │  └────────────────────┘             │
│  │   Infrastructure    │            │    │                                     │
│  └─────────────────────┘            │    │                                     │
└─────────────────────────────────────┘    └─────────────────────────────────────┘
```

### Why Containers?

Containers solve the infamous **"It works on my machine"** problem:

1. **Consistency**: Same environment across development, testing, and production
2. **Portability**: Run anywhere Docker runs
3. **Efficiency**: Better resource utilization than VMs
4. **Speed**: Fast startup and deployment
5. **Scalability**: Easy to scale horizontally
6. **Isolation**: Applications don't interfere with each other
7. **Version Control**: Container images can be versioned

### Container Technologies

While Docker popularized containers, several technologies enable containerization:

| Technology | Description |
|------------|-------------|
| **Docker** | Most popular container platform |
| **containerd** | Industry-standard container runtime |
| **CRI-O** | Lightweight container runtime for Kubernetes |
| **Podman** | Daemonless container engine (rootless) |
| **LXC/LXD** | Linux container system |

### How Containers Work

Containers leverage Linux kernel features:

1. **Namespaces**: Provide isolation (PID, network, mount, user, etc.)
2. **Control Groups (cgroups)**: Limit and monitor resource usage
3. **Union File Systems**: Layer filesystems for efficiency

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTAINER ISOLATION                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Namespaces (Isolation)          cgroups (Resource Limits)  │
│  ┌─────────────────────┐         ┌─────────────────────┐    │
│  │ • PID namespace     │         │ • CPU limits        │    │
│  │ • Network namespace │         │ • Memory limits     │    │
│  │ • Mount namespace   │         │ • I/O limits        │    │
│  │ • User namespace    │         │ • Process limits    │    │
│  │ • UTS namespace     │         │                     │    │
│  │ • IPC namespace     │         │                     │    │
│  └─────────────────────┘         └─────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ⌨️ Docker Commands

### Installation Verification

```bash
# Check Docker version
docker --version

# Check Docker info
docker info

# Verify Docker is running
docker ps
```

### Container Lifecycle Commands

```bash
# Pull an image from registry
docker pull nginx:latest

# List local images
docker images

# Run a container
docker run nginx

# Run container in background (detached mode)
docker run -d nginx

# Run with custom name
docker run -d --name my-nginx nginx

# Run with port mapping
docker run -d -p 8080:80 --name web-server nginx

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop my-nginx

# Start a stopped container
docker start my-nginx

# Restart a container
docker restart my-nginx

# Remove a container
docker rm my-nginx

# Remove a running container (force)
docker rm -f my-nginx

# Remove an image
docker rmi nginx
```

### Container Interaction Commands

```bash
# View container logs
docker logs my-nginx

# Follow logs in real-time
docker logs -f my-nginx

# Execute command inside container
docker exec my-nginx ls /usr/share/nginx/html

# Get interactive shell inside container
docker exec -it my-nginx /bin/bash

# Inspect container details
docker inspect my-nginx

# View container resource usage
docker stats my-nginx
```

### Image Commands

```bash
# Search for images
docker search nginx

# Pull specific version
docker pull nginx:1.25

# List images
docker images

# Remove unused images
docker image prune

# Tag an image
docker tag nginx:latest my-nginx:v1
```

---

## 📄 Practical Examples

### Example 1: Running Your First Container

Let's run a simple "Hello World" container:

```bash
# Run the hello-world container
docker run hello-world
```

**Expected Output:**
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

### Example 2: Running an NGINX Web Server

```bash
# Run NGINX and map port 8080 to container's port 80
docker run -d -p 8080:80 --name my-web-server nginx

# Verify it's running
docker ps

# Access in browser or use curl
curl http://localhost:8080
```

### Example 3: Interactive Container Session

```bash
# Run Ubuntu container interactively
docker run -it ubuntu:22.04 /bin/bash

# Inside the container:
# Check OS version
cat /etc/os-release

# Install a package
apt update && apt install -y curl

# Exit the container
exit
```

### Example 4: Container with Custom HTML

```bash
# Create a local HTML file
echo "<h1>Hello from Container!</h1>" > index.html

# Run NGINX with custom content
docker run -d \
  -p 8080:80 \
  -v $(pwd)/index.html:/usr/share/nginx/html/index.html \
  --name custom-nginx \
  nginx

# Verify
curl http://localhost:8080
```

---

## 🔧 Hands-on Exercises

### Exercise 1: Docker Installation Verification

**Task:** Verify Docker is properly installed on your system.

**Steps:**
1. Open your terminal
2. Run the following commands and note the output:

```bash
docker --version
docker info
docker run hello-world
```

**Expected Outcome:** All commands execute successfully, and you see the "Hello from Docker!" message.

---

### Exercise 2: Running Multiple Containers

**Task:** Run three different web servers on different ports.

**Steps:**
1. Run an NGINX container on port 8081
2. Run an Apache (httpd) container on port 8082
3. Run a Node.js Express container on port 8083 (use `node:18-alpine`)
4. List all running containers
5. Access each server in your browser

```bash
# NGINX
docker run -d -p 8081:80 --name nginx-server nginx

# Apache
docker run -d -p 8082:80 --name apache-server httpd

# For Node.js, you'll need a simple app - let's use a pre-built one
docker run -d -p 8083:3000 --name node-server node:18-alpine \
  sh -c "echo 'const http = require(\"http\"); http.createServer((req, res) => { res.end(\"Hello from Node.js!\"); }).listen(3000);' | node"

# List running containers
docker ps
```

---

### Exercise 3: Container Lifecycle Management

**Task:** Practice the complete container lifecycle.

**Steps:**
1. Run a Redis container
2. Check its logs
3. Stop the container
4. Inspect the stopped container
5. Start it again
6. Remove the container

```bash
# Run Redis container
docker run -d --name my-redis redis:alpine

# Check logs
docker logs my-redis

# Stop the container
docker stop my-redis

# Check container status
docker ps -a | grep redis

# Start the container again
docker start my-redis

# Verify it's running
docker ps

# Clean up
docker stop my-redis
docker rm my-redis
```

---

### Exercise 4: Exploring Container Internals

**Task:** Explore the filesystem and processes inside a container.

**Steps:**
1. Run an Ubuntu container in interactive mode
2. Explore the filesystem
3. Check running processes
4. Create a file
5. Exit and see what happens to the file

```bash
# Run interactive Ubuntu container
docker run -it --name explorer ubuntu:22.04 /bin/bash

# Inside the container:
# List root directory
ls -la /

# Check processes
ps aux

# Check current user
whoami

# Create a test file
echo "I was here!" > /tmp/test.txt
cat /tmp/test.txt

# Exit the container
exit

# Re-enter the container
docker start explorer
docker exec -it explorer cat /tmp/test.txt
# The file should still be there

# Clean up
docker stop explorer
docker rm explorer
```

---

## 🌍 Real-world Scenarios

### Scenario 1: Development Environment

**Problem:** Your team struggles with "it works on my machine" issues.

**Solution:** Use containers to standardize development environments.

```bash
# Instead of installing Python and dependencies locally
docker run -it -v $(pwd):/app -w /app python:3.11 bash

# Inside container - your code is in /app
pip install -r requirements.txt
python app.py
```

### Scenario 2: Testing Multiple Database Versions

**Problem:** Need to test an application against multiple MySQL versions.

**Solution:** Run different MySQL versions in containers.

```bash
# MySQL 5.7
docker run -d \
  --name mysql57 \
  -e MYSQL_ROOT_PASSWORD=secret \
  -p 3306:3306 \
  mysql:5.7

# MySQL 8.0 on different port
docker run -d \
  --name mysql80 \
  -e MYSQL_ROOT_PASSWORD=secret \
  -p 3307:3306 \
  mysql:8.0

# Test against each version
mysql -h 127.0.0.1 -P 3306 -u root -psecret
mysql -h 127.0.0.1 -P 3307 -u root -psecret
```

### Scenario 3: Isolated Build Environment

**Problem:** Different projects require different Node.js versions.

**Solution:** Use containers for isolated build environments.

```bash
# Project A - Node 16
docker run -it -v $(pwd)/projectA:/app -w /app node:16-alpine npm install

# Project B - Node 18
docker run -it -v $(pwd)/projectB:/app -w /app node:18-alpine npm install

# Project C - Node 20
docker run -it -v $(pwd)/projectC:/app -w /app node:20-alpine npm install
```

---

## ✅ Validation Steps

Use this checklist to verify you've completed today's learning:

| # | Task | Command to Verify | Expected Result |
|---|------|-------------------|-----------------|
| 1 | Docker installed | `docker --version` | Shows version number |
| 2 | Docker running | `docker info` | Shows Docker configuration |
| 3 | Can pull images | `docker images` | Shows pulled images |
| 4 | Can run containers | `docker ps -a` | Shows containers list |
| 5 | Can access container | `curl localhost:8080` | Shows NGINX welcome page |
| 6 | Can check logs | `docker logs <container>` | Shows container output |
| 7 | Can exec into container | `docker exec -it <container> ls` | Lists container files |

### Clean Up Commands

After completing exercises, clean up:

```bash
# Stop all running containers
docker stop $(docker ps -q)

# Remove all stopped containers
docker rm $(docker ps -aq)

# Remove unused images (optional)
docker image prune -f
```

---

## 📝 Summary

Today you learned:

| Topic | Key Takeaways |
|-------|--------------|
| **Containers vs VMs** | Containers are lightweight, share OS kernel, start in seconds |
| **Why Containers** | Portability, consistency, efficiency, isolation |
| **Docker Basics** | Pull, run, stop, start, rm, logs, exec |
| **Container Lifecycle** | Created → Running → Paused → Stopped → Deleted |
| **Real-world Uses** | Dev environments, testing, build isolation |

### Key Commands Cheat Sheet

```bash
docker pull <image>         # Download image
docker run -d <image>       # Run container in background
docker run -p 8080:80       # Map host:container ports
docker ps                   # List running containers
docker ps -a                # List all containers
docker stop <container>     # Stop container
docker start <container>    # Start container
docker rm <container>       # Remove container
docker logs <container>     # View logs
docker exec -it <container> # Interactive shell
```

---

## ➡️ What's Next?

Tomorrow in **Day 02: Docker Deep Dive**, we'll cover:
- Writing Dockerfiles
- Building custom images
- Multi-stage builds
- Docker Compose basics
- Container networking
- Docker best practices

This will prepare you for understanding how Kubernetes manages containers at scale.

---

<p align="center">
  <a href="../README.md">« Home</a> | <a href="../Day-02/day-02.md">Day 02: Docker Deep Dive »</a>
</p>

<p align="center">
  <strong>🧡 Happy Learning! 🧡</strong>
</p>
