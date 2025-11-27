#!/bin/bash

# Test script to verify pipeline readiness
echo "🔍 Testing Pipeline Prerequisites..."

# Check if Jenkins is running
echo "1. Checking Jenkins status..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 | grep -q "200\|403"; then
    echo "✅ Jenkins is running on http://localhost:8080"
else
    echo "❌ Jenkins is not accessible"
    exit 1
fi

# Check if Docker is running
echo "2. Checking Docker status..."
if docker info >/dev/null 2>&1; then
    echo "✅ Docker is running"
else
    echo "❌ Docker is not running"
    exit 1
fi

# Check if npm dependencies can be installed
echo "3. Testing npm build..."
if npm run build >/dev/null 2>&1; then
    echo "✅ npm build successful"
else
    echo "❌ npm build failed"
    exit 1
fi

# Check if Dockerfile exists
echo "4. Checking Docker configuration..."
if [ -f "Dockerfile" ]; then
    echo "✅ Dockerfile exists"
else
    echo "❌ Dockerfile not found"
    exit 1
fi

# Test Docker build
echo "5. Testing Docker build..."
if docker build -t minifund-test . >/dev/null 2>&1; then
    echo "✅ Docker build successful"
    docker rmi minifund-test >/dev/null 2>&1
else
    echo "❌ Docker build failed"
    exit 1
fi

echo ""
echo "🎉 All prerequisite tests passed!"
echo "Your pipeline is ready to run in Jenkins!"
echo ""
echo "Next steps:"
echo "1. Open Jenkins: http://localhost:8080"
echo "2. Add AWS credentials as described above"
echo "3. Create pipeline pointing to your GitHub repo"
echo "4. Run the pipeline!"