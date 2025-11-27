# 🔧 Jenkins AWS Credentials Setup Guide

## Step 1: Add Credentials to Jenkins

### Option A: Via Jenkins Web UI (Recommended)

1. **Open Jenkins Dashboard**:
   ```
   http://localhost:8080 (if running locally)
   ```

2. **Navigate to Credentials**:
   ```
   Dashboard → Manage Jenkins → Credentials → System → Global credentials
   ```

3. **Add AWS Access Key ID**:
   - Click "Add Credentials"
   - Kind: "Secret text"
   - Secret: `YOUR_AWS_ACCESS_KEY_ID`
   - ID: `aws-access-key-id`
   - Description: "AWS Access Key ID for S3 deployment"

4. **Add AWS Secret Access Key**:
   - Click "Add Credentials" 
   - Kind: "Secret text"
   - Secret: `YOUR_AWS_SECRET_ACCESS_KEY`
   - ID: `aws-secret-access-key`
   - Description: "AWS Secret Access Key for S3 deployment"

### Option B: Via Jenkins CLI

```bash
# Create credential files (temporary)
echo 'YOUR_AWS_ACCESS_KEY_ID' > /tmp/aws-key-id.txt
echo 'YOUR_AWS_SECRET_ACCESS_KEY' > /tmp/aws-secret-key.txt

# Add credentials via CLI
jenkins-cli create-credentials-by-xml system::system::jenkins < aws-credentials.xml

# Clean up temp files
rm /tmp/aws-key-id.txt /tmp/aws-secret-key.txt
```

## Step 2: Verify Jenkins Pipeline

Your `Jenkinsfile` is now configured to use these credentials:

```groovy
environment {
    AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    AWS_DEFAULT_REGION = 'ap-south-1'
    S3_BUCKET = 'vite-crowdfund'
}
```

## Step 3: Test the Setup

### Local Test (using .env.local):
```bash
# Load environment variables
source .env.local

# Test AWS connectivity
aws sts get-caller-identity

# Test S3 access
aws s3 ls s3://vite-crowdfund/
```

### Jenkins Test:
1. **Create a test pipeline job**
2. **Run the pipeline**
3. **Check build logs** for AWS authentication

## Step 4: Security Verification

✅ **Credentials are secure**:
- `.env.local` is gitignored
- Jenkins stores credentials encrypted
- No plaintext secrets in code

✅ **Access verification**:
```bash
# Test S3 permissions
aws s3api head-bucket --bucket vite-crowdfund
```

## 🚀 Ready to Deploy!

Your Jenkins pipeline will now:
1. **Authenticate** with AWS using stored credentials
2. **Build** your React app in Docker
3. **Deploy** to S3 with proper caching
4. **Verify** deployment success

## 🔍 Troubleshooting

### If credentials fail:
```bash
# Check credential IDs match exactly
aws-access-key-id
aws-secret-access-key

# Verify S3 bucket exists and is accessible
aws s3 ls s3://vite-crowdfund/
```

### If deployment fails:
```bash
# Check S3 bucket permissions
aws s3api get-bucket-policy --bucket vite-crowdfund

# Verify region is correct
aws configure get region
```

---

**Your CI/CD pipeline is now ready with secure AWS credentials!** 🎉