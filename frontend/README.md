# ServPulse Frontend

Vue.js 3 single-page application with Tailwind CSS, Chart.js, and Composition API.

## Structure

```
frontend/
├── src/
│   ├── App.vue                 # Root component (navbar + router-view + footer)
│   ├── main.js                 # App initialization
│   ├── components/
│   │   ├── AppNavbar.vue       # Config-driven navigation bar
│   │   ├── AppFooter.vue       # Footer with attribution
│   │   ├── StatusBadge.vue     # Status indicator with colored dot
│   │   ├── OverallStatus.vue   # System-wide status banner
│   │   ├── ServiceGroup.vue    # Grouped service list with badges
│   │   ├── IncidentTimeline.vue # Incident with update timeline
│   │   ├── MaintenanceCard.vue # Maintenance schedule card
│   │   ├── UptimeChart.vue     # 30-day uptime bar chart (Chart.js)
│   │   ├── SubscribeForm.vue   # Email/webhook subscription form
│   │   └── __tests__/          # Vitest + Vue Test Utils tests
│   ├── composables/
│   │   ├── useAuth.js          # JWT token management
│   │   ├── useIncidents.js     # Incident data fetching
│   │   ├── useMaintenances.js  # Maintenance data fetching
│   │   ├── useMetrics.js       # Metrics data fetching
│   │   └── useServices.js      # Service data fetching with grouping
│   ├── views/
│   │   ├── StatusPage.vue      # Public status page
│   │   ├── AdminDashboard.vue  # Admin CRUD (services, incidents, maintenance)
│   │   └── AdminLogin.vue      # Token-paste authentication
│   ├── plugins/
│   │   └── api.js              # Axios client with JWT interceptor
│   ├── utils/
│   │   └── status.js           # Status/impact/incident config maps and formatters
│   └── router/
│       └── index.js            # Routes with auth navigation guard
├── index.html
├── vite.config.js
├── vitest.config.js
├── tailwind.config.js          # Custom colors (brand, status)
└── postcss.config.js
```

## Development

```bash
npm install
npm run dev       # Vite dev server with HMR
npm run build     # Production build to dist/
npm run preview   # Preview production build
```

## Testing

```bash
npm run test:unit   # Vitest with jsdom environment
```

## Key Patterns

### Composables
Data fetching uses Vue 3 composables that return reactive refs:
```js
const { services, loading, error, fetchServices, groupedServices } = useServices()
```

### API Client
All API calls go through `src/plugins/api.js` which auto-attaches JWT tokens from localStorage.

### Status Utilities
`src/utils/status.js` provides consistent status labels, colors, and helper functions used across components.

### Styling
- Tailwind CSS with custom color palette (`brand-*`, `status-*`)
- Reusable classes defined in `src/assets/main.css`: `btn-primary`, `btn-secondary`, `card`, `input-field`
- Dark mode via `prefers-color-scheme` (Tailwind `dark:` variant)

## Adding Components

1. Create `.vue` file in `src/components/` using `<script setup>`
2. Use Tailwind classes and existing utilities from `@/utils/status`
3. Import composables from `@/composables/` for data
4. Add tests in `src/components/__tests__/`

## Code Conventions

- [Nasqueron conventions](https://agora.nasqueron.org/Code_conventions)
- Vue 3 Composition API with `<script setup>`
- Single quotes, camelCase naming
- Tailwind utility-first CSS (no scoped styles)
