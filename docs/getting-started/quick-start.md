# Quick Start Guide

Get up and running with SC projects in under 10 minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Git** - [Download Git](https://git-scm.com/downloads)
- **Docker** (optional) - [Download Docker](https://www.docker.com/products/docker-desktop)

## 🚀 Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/sc-website.git
cd sc-website
```

## 📦 Step 2: Install Dependencies

### Option A: Using pip (Recommended)

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Option B: Using Docker

```bash
# Build the Docker image
docker build -t sc-website .

# Run the container
docker run -p 8000:8000 sc-website
```

## ⚙️ Step 3: Configuration

Create a configuration file:

```bash
cp config.example.yml config.yml
```

Edit `config.yml` with your settings:

```yaml
# Database configuration
database:
  host: localhost
  port: 5432
  name: sc_website
  user: your_username
  password: your_password

# API configuration
api:
  host: 0.0.0.0
  port: 8000
  debug: true

# AWS configuration (for deployment)
aws:
  region: us-east-1
  bucket: your-s3-bucket
  cloudfront_id: your-cloudfront-distribution-id
```

## 🏃‍♂️ Step 4: Run the Application

### Development Mode

```bash
# Start the development server
python app.py

# Or using the provided script
./scripts/dev.sh
```

The application will be available at `http://localhost:8000`

### Production Mode

```bash
# Build for production
python -m build

# Run production server
gunicorn app:app --bind 0.0.0.0:8000 --workers 4
```

## ✅ Step 5: Verify Installation

1. **Check the homepage**: Visit `http://localhost:8000`
2. **Test the API**: Visit `http://localhost:8000/api/health`
3. **Check logs**: Monitor the console output for any errors

## 🔧 Common Issues

### Port Already in Use

If port 8000 is already in use:

```bash
# Find what's using the port
lsof -i :8000

# Kill the process or use a different port
python app.py --port 8001
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL if needed
sudo systemctl start postgresql
```

### Permission Issues

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Fix file permissions
chmod 644 config.yml
```

## 📚 Next Steps

Now that you're up and running:

1. **[Document Creation Guide](document-creation.md)** - Learn how to create new documents
2. **[Document Update Guide](document-updates.md)** - Learn how to update existing documents
3. **[Read the User Guide](user-guide/)** - Learn how to use the features
4. **[Explore the API](api/)** - Understand the available endpoints
5. **[Check Examples](user-guide/examples.md)** - See practical usage examples
6. **[Join the Team](team/)** - Learn about team processes and guidelines

## 🆘 Need Help?

- **Documentation**: Search this site for answers
- **GitHub Issues**: Report bugs or request features
- **Team Chat**: Ask questions in our team channels

---

*This guide should get you started in under 10 minutes. If you encounter any issues, check the [Troubleshooting](getting-started/troubleshooting.md) section.* 