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
│   ├── configRoutes.js
│   ├── incidentRoutes.js
│   ├── maintenanceRoutes.js
│   ├── metricRoutes.js
│   ├── serviceRoutes.js
│   ├── subscriberRoutes.js
│   └── webhookRoutes.js
├── services/
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

Admin endpoints require a JWT Bearer token. Generate one:

```js
const { generateToken } = require('./middleware/auth.js');
console.log(generateToken({ role: 'admin' }));
```

## Code Conventions

- [Nasqueron conventions](https://agora.nasqueron.org/Code_conventions)
- Single quotes, camelCase naming
- Raw `pg` queries (no ORM) for simplicity
- Fire-and-forget notifications (non-blocking)
