-- POPULATE DB

---- Create a new group
INSERT INTO service_group (name, description)
VALUES ('Group 1', 'This is the first service group.'),
	   ('Group 2', 'This is the second service group.')
RETURNING *;

---- Insert data into the service table:
INSERT INTO service (name, "group", description, status)
VALUES ('Service A', 1, 'Description A', 'Active'),
       ('Service B', 2, 'Description B', 'Inactive'),
       ('Service C', 1, 'Description C', 'Active')
RETURNING *;
