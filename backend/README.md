# ServPulse Backend

Express.js REST API server with MVC architecture, JWT authentication, and PostgreSQL.

## Structure

```
backend/
├── app.js                  # Application entry point
├── config/
│   ├── app.json            # Navbar and branding configuration
│   └── database.js         # PostgreSQL connection pool
├── controllers/
│   ├── configController.js
│   ├── incidentController.js
│   ├── maintenanceController.js
│   ├── metricController.js
│   ├── serviceController.js
│   ├── subscriberController.js
│   └── webhookController.js
├── middleware/
│   └── auth.js             # JWT authentication (generateToken, authenticate)
├── models/
│   ├── configModel.js
│   ├── incidentModel.js
│   ├── incidentServiceModel.js
│   ├── incidentUpdateModel.js
│   ├── maintenanceModel.js
│   ├── maintenanceServiceModel.js
│   ├── metricModel.js
│   ├── serviceModel.js
│   └── subscriberModel.js
├── routes/
│   ├── authRoutes.js
│   ├── configRoutes.js
│   ├── incidentRoutes.js
│   ├── maintenanceRoutes.js
│   ├── metricRoutes.js
│   ├── serviceRoutes.js
│   ├── subscriberRoutes.js
│   └── webhookRoutes.js
├── services/
│   ├── healthCheckService.js   # Periodic URL health monitoring
│   └── notificationService.js  # Email (Nodemailer) and webhook dispatch
└── __tests__/                  # Jest unit tests
```

## Development

```bash
npm install
npm run dev   # Starts with --watch for auto-reload
```

## Testing

```bash
npm test      # Runs Jest with verbose output
```

## Adding a New Resource

Follow the MVC pattern:

1. Add table to `database/init.sql`
2. Create `models/resourceModel.js` — raw `pg` queries
3. Create `controllers/resourceController.js` — req/res handlers
4. Create `routes/resourceRoutes.js` — Express router with auth where needed
5. Register routes in `app.js`
6. Add tests in `__tests__/controllers/resourceController.test.js`

## Authentication

Admin endpoints require a JWT Bearer token signed with `JWT_SECRET`.

### Generating a token

**Using Docker (recommended):**

```bash
docker compose exec backend node -e "const {generateToken} = require('./middleware/auth.js'); console.log(generateToken({role:'admin'}))"
```

**Using Node.js directly:**

```bash
cd backend
node -e "const {generateToken} = require('./middleware/auth.js'); console.log(generateToken({role:'admin'}))"
```

The token is valid for 24 hours by default.

> **Important:** Tokens are signed with `JWT_SECRET`. If you change the secret
> in your `.env`, all previously generated tokens become invalid and you must
> generate a new one. After changing `JWT_SECRET`, recreate the containers with
> `docker compose down && docker compose up -d` to apply the new value.

### Using the token

1. Copy the generated token
2. Navigate to `/admin/login` in your browser
3. Paste the token and click Sign In
4. The token is validated against the backend before granting access

The token is stored in `localStorage` and automatically attached to all API requests. It is verified server-side on every admin page navigation and on every protected API call.

### Token verification endpoint

```
POST /api/auth/verify
Authorization: Bearer <token>
```

Returns `{ "valid": true }` if the token is valid, or `401` if not.

## Health Checks

Services with a URL are automatically monitored. The health checker runs every 60 seconds (configurable via `HEALTH_CHECK_INTERVAL` environment variable) and:

- Sends an HTTP GET request to the service URL (10s timeout)
- Updates the service status to `operational` (HTTP < 400) or `major` (HTTP >= 400 or unreachable)
- Records response time, uptime, and error rate as metrics

Services without a URL retain manual status control from the admin dashboard.

## Code Conventions

- [Nasqueron conventions](https://agora.nasqueron.org/Code_conventions)
- Single quotes, camelCase naming
- Raw `pg` queries (no ORM) for simplicity
- Fire-and-forget notifications (non-blocking)
