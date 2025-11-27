# Docker + Jenkins CI/CD Setup for Minifund

This setup provides a complete Docker containerization and Jenkins CI/CD pipeline for the Minifund React application.

## 🐳 Docker Setup

### Files Created:
- `Dockerfile` - Multi-stage build for optimized production image
- `docker-compose.yml` - Orchestrates app and Jenkins services
- `nginx.conf` - Custom Nginx configuration for React SPA
- `.dockerignore` - Excludes unnecessary files from Docker build

### Build and Run Locally:

```bash
# Build the Docker image
docker build -t minifund-app .

# Run the container
docker run -p 3000:80 minifund-app

# Or use Docker Compose (includes Jenkins)
docker-compose up -d
```

## 🔧 Jenkins CI/CD Pipeline

### Files Created:
- `Jenkinsfile` - Complete CI/CD pipeline definition
- `scripts/build.sh` - Build automation script
- `scripts/test.sh` - Test execution script
- `scripts/deploy.sh` - Deployment automation script

### Pipeline Stages:
1. **Checkout** - Get source code from repository
2. **Install Dependencies** - Run `npm ci`
3. **Lint** - Code quality checks
4. **Build** - Create production build
5. **Test** - Run tests with coverage
6. **Docker Build** - Create container images
7. **Docker Push** - Push to registry (when configured)
8. **Deploy to Staging** - Auto-deploy develop branch
9. **Deploy to Production** - Manual approval for main branch

## 🚀 Getting Started

### Prerequisites:
- Docker and Docker Compose installed
- Jenkins server (or use the provided Docker Compose setup)

### Setup Steps:

1. **Start Jenkins with Docker Compose:**
   ```bash
   docker-compose up -d jenkins
   ```

2. **Access Jenkins:**
   - Open http://localhost:8080
   - Get initial admin password: `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`

3. **Configure Jenkins:**
   - Install suggested plugins
   - Install additional plugins: Docker, NodeJS, HTML Publisher
   - Configure NodeJS tool in Global Tool Configuration

4. **Create Jenkins Pipeline:**
   - New Item → Pipeline
   - Configure to use SCM (Git) and point to your repository
   - Set Script Path to `Jenkinsfile`

5. **Test the Setup:**
   ```bash
   # Build manually
   ./scripts/build.sh
   
   # Run tests
   ./scripts/test.sh
   
   # Deploy to staging
   ./scripts/deploy.sh staging latest
   ```

## 🔄 CI/CD Workflow

### Automatic Triggers:
- **Push to `develop`** → Build, Test, Deploy to Staging
- **Push to `main`** → Build, Test, Manual approval for Production

### Manual Deployment:
```bash
# Deploy to staging
./scripts/deploy.sh staging v1.2.3

# Deploy to production
./scripts/deploy.sh production v1.2.3
```

## 📊 Monitoring & Access

- **Application (Staging):** http://localhost:3001
- **Application (Production):** http://localhost:3000
- **Jenkins Dashboard:** http://localhost:8080
- **Test Coverage:** Available in Jenkins after test runs

## 🛠 Customization

### Environment Variables:
Update `docker-compose.yml` or deployment scripts with:
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_FIREBASE_CONFIG`
- Other environment-specific variables

### Registry Configuration:
Update `Jenkinsfile` with your Docker registry details:
```groovy
environment {
    REGISTRY = 'your-registry.com'
}
```

## 🔒 Security Notes

- Change default Jenkins credentials
- Use secrets management for sensitive data
- Configure proper firewall rules
- Use HTTPS in production
- Regularly update base images

## 📝 Next Steps

1. Configure a Docker registry (Docker Hub, AWS ECR, etc.)
2. Set up monitoring (Prometheus, Grafana)
3. Add notification webhooks (Slack, email)
4. Implement blue-green deployment
5. Add security scanning to pipeline