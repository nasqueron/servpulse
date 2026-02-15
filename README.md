# ServPulse

An open-source status page application for monitoring services, servers, and infrastructure.

## Features

- Component status tracking (operational, degraded, partial outage, major outage)
- Incident management with lifecycle (investigating → identified → monitoring → resolved)
- Scheduled maintenance windows
- Service grouping and organization
- Configurable navbar and branding

## Architecture

- **Frontend**: Vue.js 3 with Vite
- **Backend**: Node.js with Express.js (MVC pattern)
- **Database**: PostgreSQL

## Quick Start

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- Or: Node.js 20+ and PostgreSQL 16+

### Using Docker Compose

```bash
# Clone the repository
git clone http://devcentral.nasqueron.org/source/servpulse.git
cd servpulse

# Copy environment configuration
cp .env.example .env

# Start all services
docker compose up
```

The application will be available at:
- **Status page**: http://localhost:8080
- **API**: http://localhost:3000/api

### Manual Setup

```bash
# Start PostgreSQL (or use an existing instance)
# Update .env with your connection string

# Backend
cd backend
npm install
node app.js

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## Project Structure

```
servpulse/
├── backend/          # Express.js API server
│   ├── config/       # App and database configuration
│   ├── controllers/  # Request handlers
│   ├── models/       # Data access layer
│   └── routes/       # API route definitions
├── frontend/         # Vue.js application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── views/       # Page views
│   │   ├── plugins/     # API client and utilities
│   │   └── router/      # Route definitions
│   └── public/          # Static assets
└── database/         # SQL scripts and migrations
```

## API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/service/getAll` | List all services    |
| POST   | `/api/service`        | Create a service     |
| GET    | `/api/incident/getAll`| List all incidents   |
| GET    | `/api/config/getAll`  | Get app configuration|

## Contributing

This project uses [Phabricator](https://devcentral.nasqueron.org/) for issue tracking (callsign: **SP**).

Code conventions: https://agora.nasqueron.org/Code_conventions

## License

[MIT](LICENSE)
