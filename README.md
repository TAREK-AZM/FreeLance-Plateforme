# 🚀 Freelance Platform - Service Provider & Client Connection

A modern web platform that seamlessly connects service providers (both online and offline) with clients, featuring AI-powered search capabilities and comprehensive project management tools.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Team](#team)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Our freelance platform revolutionizes how service providers and clients connect by offering:
- **Intelligent Matching**: AI-powered search and filtering system
- **Seamless Communication**: Built-in messaging system
- **Quality Assurance**: Rating and feedback system
- **Real-time Updates**: Notification management system
- **User-Friendly Interface**: Modern, responsive design

## ✨ Key Features

### 🔧 Service & Offer Management
- Add, modify, and delete service offers
- Comprehensive service categorization
- Real-time offer status updates

### 🔍 Advanced Search & Filtering
- **AI-Powered Search**: Integration with Groq for intelligent search criteria extraction
- Smart filtering based on location, skills, price, and ratings
- Personalized recommendations

### 💬 Internal Messaging System
- Real-time communication between clients and service providers
- File sharing capabilities
- Message history and search

### ⭐ Rating & Review System
- Comprehensive rating system for service providers
- Detailed client feedback and reviews
- Trust score calculation

### 🔔 Notification Management
- Real-time notifications for new offers, messages, and updates
- Email and in-app notification preferences
- Custom notification settings

### 🤖 AI Integration
- **Groq AI** for automated search criteria extraction
- Intelligent matching algorithms
- Enhanced user experience through AI recommendations

## 🛠 Technologies Used

### Backend
- **Spring Boot** - Java-based backend framework
- **PostgreSQL** - Primary database
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence layer

### Frontend
- **React** - Modern JavaScript library for UI
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

### AI & Integration
- **Groq API** - AI-powered search and filtering
- **RESTful APIs** - Service communication

### DevOps & Deployment
- **Docker** - Containerization
- **Amazon EC2** - Cloud deployment
- **Jenkins** - Continuous Integration/Continuous Deployment
- **SonarQube** - Code quality analysis
- **Git & GitHub** - Version control

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │  Spring Boot    │    │   PostgreSQL    │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Docker      │    │   Jenkins CI    │    │   SonarQube     │
│  (Containers)   │    │   (Pipeline)    │    │ (Code Quality)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Amazon EC2    │
│  (Deployment)   │
└─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Java 17+**
- **Node.js 16+**
- **PostgreSQL 13+**
- **Docker & Docker Compose**
- **Git**

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=freelance_platform
DB_USERNAME=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key
GROQ_API_URL=https://api.groq.com/openai/v1

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# AWS Configuration (for deployment)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
```

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/freelance-platform.git
cd freelance-platform
```

### 2. Backend Setup

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. Database Setup

```sql
-- Create database
CREATE DATABASE freelance_platform;

-- Create user (optional)
CREATE USER freelance_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE freelance_platform TO freelance_user;
```

### 5. Docker Setup (Alternative)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run individual services
docker build -t freelance-backend ./backend
docker build -t freelance-frontend ./frontend
docker run -p 8080:8080 freelance-backend
docker run -p 3000:3000 freelance-frontend
```

## 💻 Usage

### For Service Providers

1. **Registration**: Create an account and complete your profile
2. **Add Services**: List your services with detailed descriptions
3. **Manage Offers**: Update pricing and availability
4. **Communication**: Respond to client inquiries
5. **Track Performance**: Monitor ratings and feedback

### For Clients

1. **Search Services**: Use AI-powered search to find providers
2. **Filter Results**: Apply location, price, and rating filters
3. **Contact Providers**: Send messages and discuss requirements
4. **Request Services**: Submit project requests
5. **Rate & Review**: Provide feedback after service completion

## 📚 API Documentation

### Authentication

```bash
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
```

### User Management

```bash
GET /api/users/profile
PUT /api/users/profile
GET /api/users/{id}
```

### Services

```bash
GET /api/services
POST /api/services
PUT /api/services/{id}
DELETE /api/services/{id}
GET /api/services/search?q={query}
```

### Messaging

```bash
GET /api/messages
POST /api/messages
GET /api/messages/conversation/{userId}
```

### Notifications

```bash
GET /api/notifications
PUT /api/notifications/{id}/read
DELETE /api/notifications/{id}
```

## 🧪 Testing

### Backend Testing

```bash
cd backend
./mvnw test
./mvnw jacoco:report
```

### Frontend Testing

```bash
cd frontend
npm test
npm run test:coverage
```

### Integration Testing

```bash
# Run with Docker Compose
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🚀 Deployment

### CI/CD Pipeline

The project uses Jenkins for continuous integration:

1. **Code Commit** → GitHub webhook triggers Jenkins
2. **Build & Test** → Jenkins runs tests and builds artifacts
3. **Code Analysis** → SonarQube analyzes code quality
4. **Docker Build** → Creates Docker images
5. **Deploy** → Deploys to Amazon EC2

### Manual Deployment

```bash
# Build production images
docker build -t freelance-platform:latest .

# Push to registry
docker push your-registry/freelance-platform:latest

# Deploy to EC2
ssh -i your-key.pem ec2-user@your-ec2-instance
docker pull your-registry/freelance-platform:latest
docker-compose -f docker-compose.prod.yml up -d
```

## 👥 Team

| Name | Role | Responsibilities |
|------|------|------------------|
| **TAREK AL AZAMI** | Team Lead | Project Management + Deployment |
| **Mohammed Louah** | Security Engineer | Backend Security + Testing |
| **EL-BATTEOUI OUSSAMA** | Backend Developer | Backend Development + AI Integration |
| **Abdelouahed ABBAD** | Frontend Developer | React Frontend Development |
| **FAROUK ZAKARIA** | Frontend Developer | UI/UX + Frontend Features |

**Supervisor**: Mr. Hassan Badir

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow Java coding conventions for backend
- Use ESLint and Prettier for frontend
- Maintain test coverage above 80%
- Write clear commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mr. Hassan Badir** - Project Supervisor
- **Groq Team** - AI Integration Support
- **Open Source Community** - Various libraries and tools

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Contact the development team
- Check our [Wiki](wiki-link) for detailed documentation

---

**Made with ❤️ by the Freelance Platform Team**

#DevOps #CI_CD #SpringBoot #React #Docker #Jenkins #AWS #SonarQube #AI #PostgreSQL
