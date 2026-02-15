# ServPulse

An open-source status page application for monitoring services, servers, and infrastructure. Built with simplicity, transparency, and self-hosting in mind.

## Features

- **Service monitoring** — Track component statuses (operational, degraded, partial outage, major outage)
- **Incident management** — Full lifecycle tracking (investigating → identified → monitoring → resolved)
- **Scheduled maintenance** — Plan and communicate maintenance windows
- **Service grouping** — Organize services by groups with customizable ordering
- **Metrics tracking** — Store and display uptime, response time, and error rate (30-day charts)
- **Notifications** — Email and webhook subscriber notifications on incidents
- **Monitoring integrations** — Inbound webhook for automated status updates from tools like Prometheus
- **Admin dashboard** — CRUD interface for managing services, incidents, and maintenance
- **Dark mode** — Automatic dark mode support via system preferences
- **Docker ready** — One-command setup with Docker Compose

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│  PostgreSQL  │
│  Vue.js 3    │     │  Express.js  │     │     16       │
│  Tailwind    │     │  Node.js 20  │     │              │
│  Chart.js    │     │  JWT Auth    │     │              │
└─────────────┘     └──────────────┘     └──────────────┘
    :8080               :3000                :5432
```

For detailed diagrams (component tree, backend MVC, database ER, status flows), see **[docs/architecture.md](docs/architecture.md)**.

- **Frontend**: Vue.js 3 + Vite + Tailwind CSS + Chart.js
- **Backend**: Node.js 20 + Express.js (MVC pattern) + JWT authentication
- **Database**: PostgreSQL 16

## Quick Start

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- Or: Node.js 20+ and PostgreSQL 16+

### Using Docker Compose (recommended)

```bash
# Clone the repository
git clone http://devcentral.nasqueron.org/source/servpulse.git
cd servpulse

# Copy environment configuration
cp .env.example .env
# Edit .env with your settings (database credentials, JWT secret, SMTP config)

# Start all services
docker compose up
```

The application will be available at:
- **Status page**: http://localhost:8080
- **API**: http://localhost:3000/api

### Manual Setup

```bash
# Start PostgreSQL and create the database
psql -U postgres -c "CREATE DATABASE servpulse;"
psql -U postgres -d servpulse -f database/init.sql

# Backend
cd backend
cp .env.dist .env   # Edit with your database connection string
npm install
npm run dev          # Development mode with auto-reload

# Frontend (in another terminal)
cd frontend
npm install
npm run dev          # Vite dev server at http://localhost:5173
```

### Production Deployment

```bash
# Build and run with production Docker Compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

See [Deployment Guide](#deployment) for detailed production setup.

## Project Structure

```
servpulse/
├── backend/                # Express.js API server
│   ├── config/             # App config (app.json) and database connection
│   ├── controllers/        # Request handlers (service, incident, maintenance, metric, subscriber, webhook)
│   ├── middleware/          # JWT authentication middleware
│   ├── models/             # Data access layer (raw pg queries)
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic (notification dispatch)
│   └── __tests__/          # Jest unit tests
├── frontend/               # Vue.js 3 application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── AppNavbar.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── StatusBadge.vue
│   │   │   ├── OverallStatus.vue
│   │   │   ├── ServiceGroup.vue
│   │   │   ├── IncidentTimeline.vue
│   │   │   ├── MaintenanceCard.vue
│   │   │   ├── UptimeChart.vue
│   │   │   ├── SubscribeForm.vue
│   │   │   └── __tests__/  # Vitest component tests
│   │   ├── composables/    # Vue 3 composables (useServices, useIncidents, etc.)
│   │   ├── views/          # Page views (StatusPage, AdminDashboard, AdminLogin)
│   │   ├── plugins/        # API client (axios)
│   │   ├── utils/          # Status helpers and formatters
│   │   └── router/         # Vue Router config with auth guards
│   └── public/             # Static assets
├── database/               # SQL schema (init.sql)
├── docker-compose.yml      # Development Docker Compose
├── docker-compose.prod.yml # Production Docker Compose
└── .env.example            # Environment variable template
```

## API Reference

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | List all services (ordered by group) |
| GET | `/api/services/:id` | Get a single service |
| GET | `/api/incidents` | List all incidents (newest first) |
| GET | `/api/incidents/:id` | Get incident with updates and affected services |
| GET | `/api/maintenances` | List all scheduled maintenances |
| GET | `/api/maintenances/:id` | Get maintenance with affected services |
| GET | `/api/metrics` | Get latest metrics per service |
| GET | `/api/metrics/service/:id` | Get raw metrics for a service (query: `?days=30`) |
| GET | `/api/metrics/service/:id/daily` | Get daily metric summaries (query: `?days=30`) |
| GET | `/api/config/getAll` | Get app configuration (navbar, branding) |
| POST | `/api/subscribers` | Subscribe to notifications (email or webhook) |
| GET | `/api/subscribers/confirm/:token` | Confirm a subscription |

### Admin Endpoints (requires `Authorization: Bearer <JWT>`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/services` | Create a service |
| PUT | `/api/services/:id` | Update a service |
| DELETE | `/api/services/:id` | Delete a service |
| POST | `/api/incidents` | Create an incident (supports `service_ids`) |
| PUT | `/api/incidents/:id` | Update an incident (supports `service_ids`, `message`) |
| PUT | `/api/incidents/:id/resolve` | Resolve an incident |
| POST | `/api/maintenances` | Schedule maintenance (supports `service_ids`) |
| PUT | `/api/maintenances/:id` | Update maintenance |
| DELETE | `/api/maintenances/:id` | Delete maintenance |
| POST | `/api/metrics` | Record a metric data point |
| GET | `/api/subscribers` | List all subscribers |
| DELETE | `/api/subscribers/:id` | Remove a subscriber |
| POST | `/api/webhooks/ingest` | Inbound monitoring webhook |

### Monitoring Webhook

External monitoring tools can push status updates via `POST /api/webhooks/ingest`:

```json
{
  "service_name": "Web Server",
  "status": "degraded",
  "message": "High response times detected",
  "impact": "minor"
}
```

This automatically updates the service status and creates an incident if the status is non-operational.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_USER` | `servpulse` | Database username |
| `POSTGRES_PASSWORD` | — | Database password |
| `POSTGRES_DB` | `servpulse` | Database name |
| `POSTGRES_CONNECTION_STRING` | — | Full PostgreSQL connection string |
| `EXPRESS_PORT` | `3000` | Backend API port |
| `JWT_SECRET` | `servpulse-dev-secret` | Secret for JWT token signing |
| `VITE_API_URL` | `http://localhost:3000/api` | API URL for frontend |
| `SMTP_HOST` | `localhost` | SMTP server for email notifications |
| `SMTP_PORT` | `587` | SMTP port |
| `SMTP_SECURE` | `false` | Use TLS for SMTP |
| `SMTP_USER` | — | SMTP username |
| `SMTP_PASS` | — | SMTP password |
| `SMTP_FROM` | `ServPulse <noreply@servpulse.local>` | Sender address |

## Testing

```bash
# Backend tests (Jest)
cd backend
npm test

# Frontend tests (Vitest)
cd frontend
npm run test:unit
```

## Deployment

### Self-Hosting with Docker

1. Clone the repository on your server
2. Copy `.env.example` to `.env` and configure:
   - Set a strong `JWT_SECRET`
   - Set `POSTGRES_PASSWORD`
   - Configure SMTP for email notifications (optional)
3. Use the production Docker Compose:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```
4. Generate an admin JWT token:
   ```bash
   docker compose exec backend node -e "const {generateToken} = require('./middleware/auth.js'); console.log(generateToken({role:'admin'}))"
   ```
5. Use the token to log into the admin dashboard at `/admin/login`

### Reverse Proxy (Nginx)

For production, place Nginx in front to serve the frontend and proxy API requests:

```nginx
server {
    listen 80;
    server_name status.example.com;

    location / {
        proxy_pass http://localhost:8080;
    }

    location /api/ {
        proxy_pass http://localhost:3000;
    }
}
```

## Contributing

This project uses [Phabricator](https://devcentral.nasqueron.org/) for issue tracking (callsign: **SP**).

Code conventions: https://agora.nasqueron.org/Code_conventions

- Single quotes for strings
- camelCase for variables and functions
- Vue 3 Composition API (`<script setup>`) for components
- Tailwind CSS utility classes for styling

## License

[MIT](LICENSE)
