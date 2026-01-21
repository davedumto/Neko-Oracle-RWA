# API Publisher Service

Exposes REST/WebSocket endpoints for accessing signed stock price data.

## Overview

The API service is responsible for:
- Exposing REST endpoints for querying current and historical prices
- Providing WebSocket subscriptions for real-time price updates
- Serving signed price proofs for verification
- Implementing rate limiting and authentication

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

Install dependencies:

```bash
npm install
```

### Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

### Running the Service

#### Development Mode

```bash
npm run start:dev
```

The service will start on `http://localhost:3002` (or the port specified in `.env`).

#### Production Mode

First, build the application:

```bash
npm run build
```

Then start the service:

```bash
npm start
```

### Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:cov
```

### Linting

Check code style:

```bash
npm run lint
```

## API Endpoints

### Health Check

```bash
GET /health
```

Returns service health status and timestamp.

**Response:**
```json
{
  "status": "ok",
  "timestamp": 1234567890123
}
```

### Root

```bash
GET /
```

Returns service name.

## Project Structure

```
apps/api/
├── src/
│   ├── main.ts          # Application entry point
│   ├── app.module.ts    # Root module
│   ├── app.controller.ts # Main controller
│   └── app.service.ts   # Main service
├── .env.example         # Example environment variables
├── nest-cli.json        # NestJS CLI configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Status

🚧 Under construction - REST and WebSocket endpoints will be implemented in subsequent issues.
