# Aggregator Service

Normalizes, filters, and aggregates stock price data from multiple sources.

## Overview

The aggregator service is responsible for:
- Receiving raw price data from multiple ingestors
- Normalizing data formats from different sources
- Filtering out outliers and invalid data
- Aggregating prices using weighted averages or median calculations
- Producing a single consensus price per stock symbol

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

The service will start on `http://localhost:3001` (or the port specified in `.env`).

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

## Project Structure

```
apps/aggregator/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   ├── interfaces/                # Type definitions
│   │   ├── normalized-price.interface.ts
│   │   └── normalizer.interface.ts
│   ├── normalizers/               # Source-specific normalizers
│   │   ├── base.normalizer.ts
│   │   ├── alpha-vantage.normalizer.ts
│   │   ├── finnhub.normalizer.ts
│   │   ├── yahoo-finance.normalizer.ts
│   │   └── mock.normalizer.ts
│   ├── services/                  # Business logic
│   │   └── normalization.service.ts
│   ├── modules/                   # Feature modules
│   │   └── normalization.module.ts
│   └── exceptions/                # Custom exceptions
│       └── normalization.exception.ts
├── .env.example         # Example environment variables
├── nest-cli.json        # NestJS CLI configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Data Normalization

### NormalizedPrice Interface

The standard internal format for normalized price data:

```typescript
interface NormalizedPrice {
  symbol: string;           // Normalized ticker (e.g., 'AAPL')
  price: number;            // Price rounded to 4 decimal places
  timestamp: string;        // ISO 8601 UTC (e.g., '2024-01-15T14:30:00.000Z')
  originalTimestamp: number; // Original Unix timestamp in milliseconds
  source: NormalizedSource; // Enum: 'alpha_vantage' | 'finnhub' | 'yahoo_finance' | 'mock'
  metadata: {
    originalSource: string;    // Original source string
    originalSymbol: string;    // Original symbol before normalization
    normalizedAt: string;      // When normalization occurred
    normalizerVersion: string; // Version of normalizer used
    wasTransformed: boolean;   // Whether transformations were applied
    transformations: string[]; // List of transformations applied
  };
}
```

### Supported Sources and Transformations

| Source | Detected By | Symbol Transformations |
|--------|-------------|------------------------|
| **Alpha Vantage** | `alphavantage`, `alpha_vantage`, `alpha-vantage` | Removes `.US`, `.NYSE`, `.NASDAQ`, `.LSE`, `.TSX`, `.ASX`, `.HK` suffixes |
| **Finnhub** | `finnhub` | Removes `US-`, `CRYPTO-`, `FX-`, `INDICES-` prefixes |
| **Yahoo Finance** | `yahoo`, `yahoofinance`, `yahoo_finance`, `yahoo-finance` | Removes `.L`, `.T`, `.AX`, `.HK`, `.SI`, `.KS`, `.TW`, `.NS`, `.BO`, `.TO`, `.DE`, `.PA` suffixes; removes `^` index prefix |
| **Mock** | `mock` | Basic cleanup (trim, uppercase) |

### Common Transformations

All normalizers apply these transformations:
- **Symbol**: Trimmed and uppercased
- **Price**: Rounded to 4 decimal places
- **Timestamp**: Converted to ISO 8601 UTC format

### Usage Example

```typescript
import { NormalizationService } from './services/normalization.service';

// Inject via NestJS DI
constructor(private readonly normalizationService: NormalizationService) {}

// Normalize a single price
const rawPrice = {
  symbol: 'AAPL.US',
  price: 150.123456,
  timestamp: Date.now(),
  source: 'AlphaVantage',
};
const normalized = this.normalizationService.normalize(rawPrice);
// Result: { symbol: 'AAPL', price: 150.1235, timestamp: '2024-01-15T14:30:00.000Z', ... }

// Normalize multiple prices (skips failures)
const results = this.normalizationService.normalizeMany(rawPrices);

// Normalize with error tracking
const { successful, failed } = this.normalizationService.normalizeManyWithErrors(rawPrices);
```

## Status

🚧 Under construction - Aggregation and filtering logic will be implemented in subsequent issues.
