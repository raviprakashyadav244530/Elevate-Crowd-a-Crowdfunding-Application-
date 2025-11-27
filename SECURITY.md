# Security Guidelines for CI/CD Pipeline

## 🔒 AWS Credentials Security

### ❌ NEVER DO THIS:
```bash
# DON'T put credentials in code files
AWS_ACCESS_KEY_ID = AKIAVQIOHQKRSYXAIC6E
AWS_SECRET_ACCESS_KEY = your-secret-key
```

### ✅ SECURE METHODS:

#### 1. Jenkins Credential Store (Recommended)
```bash
# In Jenkins UI:
Dashboard → Manage Jenkins → Credentials → Global → Add Credentials

1. Kind: "Secret text"
   ID: "aws-access-key-id"
   Secret: [your-access-key]

2. Kind: "Secret text"
   ID: "aws-secret-access-key" 
   Secret: [your-secret-key]
```

#### 2. Environment Variables (Local)
```bash
# Create .env.local file (NOT committed to git)
cp .env.example .env.local
# Edit .env.local with your actual credentials
```

#### 3. AWS IAM Roles (Production)
```bash
# For EC2/ECS deployments
# Attach IAM role to Jenkins instance
# No credentials needed in code
```

## 🛡️ Best Practices

1. **Rotate Keys Regularly**: Change AWS keys every 90 days
2. **Principle of Least Privilege**: Only grant necessary S3 permissions
3. **Use IAM Roles**: When possible, avoid access keys entirely
4. **Monitor Usage**: Check AWS CloudTrail for unusual activity
5. **Secure Storage**: Use Jenkins credential store or AWS Secrets Manager

## 🔧 Required S3 Permissions

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::vite-crowdfund",
                "arn:aws:s3:::vite-crowdfund/*"
            ]
        }
    ]
}
```

## ⚡ Setup Steps

1. **Secure your credentials** using Jenkins credential store
2. **Update Jenkins pipeline** to use credential references
3. **Test deployment** with secure configuration
4. **Never commit actual keys** to version control

Remember: Security first, then automation! 🛡️