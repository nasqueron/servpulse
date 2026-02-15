--     -------------------------------------------------------------
--     ServPulse :: database schema
--     - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
--     Project:        Nasqueron
--     Description:    Initialize database tables
--     License:        MIT
--     -------------------------------------------------------------

--
-- Services
--

CREATE TABLE IF NOT EXISTS service (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "group" VARCHAR(255),
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'operational',
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

--
-- Incidents
--

CREATE TABLE IF NOT EXISTS incident (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP,
    end_date TIMESTAMP,
    type_id INTEGER DEFAULT 1,
    status VARCHAR(50) NOT NULL DEFAULT 'investigating',
    impact VARCHAR(50) NOT NULL DEFAULT 'none',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS incident_update (
    id SERIAL PRIMARY KEY,
    incident_id INTEGER NOT NULL REFERENCES incident(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS incident_service (
    id SERIAL PRIMARY KEY,
    incident_id INTEGER NOT NULL REFERENCES incident(id) ON DELETE CASCADE,
    service_id INTEGER NOT NULL REFERENCES service(id) ON DELETE CASCADE,
    UNIQUE(incident_id, service_id)
);

--
-- Scheduled maintenance
--

CREATE TABLE IF NOT EXISTS maintenance (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_start TIMESTAMP NOT NULL,
    scheduled_end TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS maintenance_service (
    id SERIAL PRIMARY KEY,
    maintenance_id INTEGER NOT NULL REFERENCES maintenance(id) ON DELETE CASCADE,
    service_id INTEGER NOT NULL REFERENCES service(id) ON DELETE CASCADE,
    UNIQUE(maintenance_id, service_id)
);

--
-- Subscribers
--

CREATE TABLE IF NOT EXISTS subscriber (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    webhook_url TEXT,
    type VARCHAR(20) NOT NULL DEFAULT 'email',
    confirmed BOOLEAN NOT NULL DEFAULT false,
    confirm_token VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT subscriber_contact CHECK (email IS NOT NULL OR webhook_url IS NOT NULL)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriber_email ON subscriber(email) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriber_webhook ON subscriber(webhook_url) WHERE webhook_url IS NOT NULL;

--
-- Metrics
--

CREATE TABLE IF NOT EXISTS metric (
    id SERIAL PRIMARY KEY,
    service_id INTEGER NOT NULL REFERENCES service(id) ON DELETE CASCADE,
    uptime DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    response_time INTEGER,
    error_rate DECIMAL(5,2) DEFAULT 0.00,
    recorded_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_metric_service_date ON metric(service_id, recorded_at DESC);
