CREATE TABLE "service" (
  "id" serial PRIMARY KEY,
  "name" varchar,
  "group" int,
  "description" varchar,
  "status" varchar
);

CREATE TABLE "service_group" (
  "id" serial PRIMARY KEY,
  "name" varchar,
  "description" varchar
);

CREATE TABLE "incident" (
  "id" serial PRIMARY KEY,
  "title" varchar,
  "start_date" timestamp,
  "update_date" timestamp,
  "type_id" int,
  "status" varchar
);

CREATE TABLE "incident_service" (
  "id" serial PRIMARY KEY,
  "incident" int,
  "service" int
);

CREATE TABLE "incident_type" (
  "id" serial PRIMARY KEY,
  "label" varchar,
  "color" varchar
);

CREATE TABLE "incident_post" (
  "id" serial PRIMARY KEY,
  "incident_id" int,
  "date" timestamp,
  "step_id" int,
  "note" varchar
);

CREATE TABLE "incident_post_steps" (
  "id" serial PRIMARY KEY,
  "label" varchar
);

ALTER TABLE "service" ADD FOREIGN KEY ("group") REFERENCES "service_group" ("id");

ALTER TABLE "incident" ADD FOREIGN KEY ("type_id") REFERENCES "incident_type" ("id");

ALTER TABLE "incident_service" ADD FOREIGN KEY ("incident") REFERENCES "incident" ("id");

ALTER TABLE "incident_service" ADD FOREIGN KEY ("service") REFERENCES "service" ("id");

ALTER TABLE "incident_post" ADD FOREIGN KEY ("incident_id") REFERENCES "incident" ("id");

ALTER TABLE "incident_post" ADD FOREIGN KEY ("step_id") REFERENCES "incident_post_steps" ("id");
