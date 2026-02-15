--     -------------------------------------------------------------
--     ServPulse :: database schema
--     - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
--     Project:        Nasqueron
--     Description:    Initialize database tables
--     License:        MIT
--     -------------------------------------------------------------

CREATE TABLE IF NOT EXISTS service (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "group" VARCHAR(255),
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'operational'
);

CREATE TABLE IF NOT EXISTS incident (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP,
    type_id INTEGER,
    status VARCHAR(50) NOT NULL DEFAULT 'investigating'
);
