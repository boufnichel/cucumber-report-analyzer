# Cucumber Report Analyzer

A scalable SaaS application for analyzing Cucumber test reports with advanced analytics and visualizations.

## Architecture Overview

This application uses a microservices architecture with the following components:

- **API Gateway**: Entry point for all client requests
- **Auth Service**: Handles user authentication and authorization
- **Report Parser Service**: Processes and stores Cucumber JSON reports
- **Analytics Service**: Generates insights and statistics
- **Export Service**: Handles report export functionality

## Project Structure

```
├── services/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── report-parser/
│   ├── analytics-service/
│   └── export-service/
├── frontend/
├── deployment/
└── docs/
```

## Technology Stack

- **Backend**: Kotlin + Spring Boot
- **Frontend**: React + TypeScript
- **Database**: MongoDB
- **Infrastructure**: Docker + Kubernetes
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- JDK 17+
- Node.js 18+
- Docker
- Kubernetes cluster
- MongoDB

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/boufnichel/cucumber-report-analyzer.git
   ```

2. Start the development environment:
   ```bash
   docker-compose up -d
   ```

3. Run the backend services:
   ```bash
   cd services/report-parser
   ./gradlew bootRun
   ```

4. Run the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Documentation

- [API Documentation](docs/api/README.md)
- [Deployment Guide](docs/deployment/README.md)
- [Architecture Decision Records](docs/adr/README.md)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.