# Installation Guide

Complete installation guide for SC projects across different platforms and environments.

## System Requirements

### Minimum Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Python**: 3.8 or higher
- **Memory**: 4GB RAM
- **Storage**: 2GB free space
- **Network**: Internet connection for package downloads

### Recommended Requirements

- **Operating System**: Latest stable version
- **Python**: 3.11 or higher
- **Memory**: 8GB RAM or more
- **Storage**: 5GB free space
- **Network**: High-speed internet connection

## Installation Methods

### Method 1: Standard Installation (Recommended)

#### Step 1: Install Python

**Windows:**
1. Download Python from [python.org](https://www.python.org/downloads/)
2. Run the installer with "Add Python to PATH" checked
3. Verify installation: `python --version`

**macOS:**
```bash
# Using Homebrew (recommended)
brew install python

# Or download from python.org
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

#### Step 2: Clone the Repository

```bash
git clone https://github.com/your-username/sc-website.git
cd sc-website
```

#### Step 3: Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

#### Step 4: Install Dependencies

```bash
# Upgrade pip
pip install --upgrade pip

# Install requirements
pip install -r requirements.txt
```

### Method 2: Docker Installation

#### Prerequisites

Install Docker Desktop:
- **Windows/macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: [Docker Engine](https://docs.docker.com/engine/install/)

#### Installation Steps

```bash
# Clone repository
git clone https://github.com/your-username/sc-website.git
cd sc-website

# Build Docker image
docker build -t sc-website .

# Run container
docker run -d -p 8000:8000 --name sc-website-app sc-website
```

### Method 3: Development Installation

For developers who want to contribute to the project:

```bash
# Clone repository
git clone https://github.com/your-username/sc-website.git
cd sc-website

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install development dependencies
pip install -r requirements-dev.txt

# Install pre-commit hooks
pre-commit install

# Run tests
pytest
```

## Platform-Specific Instructions

### Windows Installation

#### Using Chocolatey

```bash
# Install Chocolatey first (run as Administrator)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Python and Git
choco install python git

# Clone and setup
git clone https://github.com/your-username/sc-website.git
cd sc-website
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### Using WSL (Windows Subsystem for Linux)

```bash
# Install WSL
wsl --install

# Follow Linux installation instructions in WSL
```

### macOS Installation

#### Using Homebrew

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install dependencies
brew install python git

# Clone and setup
git clone https://github.com/your-username/sc-website.git
cd sc-website
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Linux Installation

#### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install dependencies
sudo apt install python3 python3-pip python3-venv git curl

# Clone and setup
git clone https://github.com/your-username/sc-website.git
cd sc-website
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### CentOS/RHEL/Fedora

```bash
# Install dependencies
sudo dnf install python3 python3-pip git  # Fedora
# or
sudo yum install python3 python3-pip git  # CentOS/RHEL

# Clone and setup
git clone https://github.com/your-username/sc-website.git
cd sc-website
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sc_website

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=true

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET=your-bucket-name
CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id

# Security
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret
```

### Configuration File

Create `config.yml`:

```yaml
# Application settings
app:
  name: SC Website
  version: 1.0.0
  debug: false

# Database configuration
database:
  host: localhost
  port: 5432
  name: sc_website
  user: your_username
  password: your_password
  pool_size: 10

# API configuration
api:
  host: 0.0.0.0
  port: 8000
  workers: 4
  timeout: 30

# Logging
logging:
  level: INFO
  format: '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
  file: logs/app.log

# AWS configuration
aws:
  region: us-east-1
  bucket: your-s3-bucket
  cloudfront_id: your-cloudfront-distribution-id
```

## Verification

### Test the Installation

```bash
# Check Python version
python --version

# Check installed packages
pip list

# Run the application
python app.py

# Test API endpoint
curl http://localhost:8000/api/health
```

### Expected Output

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Troubleshooting

### Common Issues

#### Python Not Found

```bash
# Check if Python is in PATH
which python
python --version

# Add Python to PATH (Windows)
# Add C:\Python39 and C:\Python39\Scripts to PATH environment variable
```

#### Permission Denied

```bash
# Fix permissions (Linux/macOS)
chmod +x scripts/*.sh
chmod 644 config.yml

# Run as administrator (Windows)
# Right-click Command Prompt and select "Run as administrator"
```

#### Port Already in Use

```bash
# Find process using port
lsof -i :8000  # Linux/macOS
netstat -ano | findstr :8000  # Windows

# Kill process
kill -9 <PID>  # Linux/macOS
taskkill /PID <PID> /F  # Windows
```

#### Virtual Environment Issues

```bash
# Recreate virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Getting Help

- **Documentation**: Search this site for solutions
- **GitHub Issues**: Report bugs or request features
- **Stack Overflow**: Search for similar problems
- **Team Support**: Ask in team channels

## Next Steps

After successful installation:

1. **[Configuration Guide](configuration.md)** - Configure the system
2. **[Quick Start](quick-start.md)** - Get up and running
3. **[User Guide](user-guide/)** - Learn how to use the features
4. **[Development Setup](development/setup.md)** - Set up development environment

---

*If you encounter any issues during installation, please check the troubleshooting section or contact the team for support.* 