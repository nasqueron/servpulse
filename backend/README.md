# How it started
The backend of ServPulse was developed using an MVC-inspired architecture. First, Node v20.1.0 was installed using NVM[^1], followed by Express.js. Finally, the backend was connected to a PostgreSQL database.

It is important to note that while some elements and features are not currently implemented in the project, they are included as examples to demonstrate the organization of the project as it progresses.

# Backend's structure
```shell
├── app.js
├── config
│   ├── app.json
│   └── database.js
├── routes
│   ├── configRoutes.js
│   ├── incidentRoutes.js
│   └── serviceRoutes.js
├── controllers
│   ├── configController.js
│   ├── incidentController.js
│   └── serviceController.js
├── models
│   ├── configModel.js
│   ├── incidentModel.js
│   ├── incidentPostModel.js
│   ├── incidentPostStatusModel.js
│   ├── incidentServiceModel.js
│   └── serviceModel.js
└── package.json
```

# Insights
- `app.js`: This is the starting point of the application and is responsible for loading everything and serving user requests.
- `config`: This folder contains configuration files such as `app.json` and `database.js`, which define settings and variables for the application.
- `routes`: This folder contains route files such as `configRoutes.js`, `incidentRoutes.js`, and `serviceRoutes.js`, which define the routes and their corresponding handlers for different parts of the application.
- `controllers`: This folder contains controller files such as `configController.js`, `incidentController.js`, and `serviceController.js`, which define the business logic and handle the requests and responses for different parts of the application.
- `models`: This folder contains model files such as `configModel.js`, `incidentModel.js`, `incidentPostModel.js`, `incidentPostStatusModel.js`, `incidentServiceModel.js`, and `serviceModel.js`, which represent the data, implement the business logic, and handle storage for different parts of the application.
- `package.json`: This file is used to define the project dependencies, scripts, and other metadata for the application.

The above explanation provides a general overview of the common files and directories found in an MVC-like backend.

# Notes
- The `/config/app.json` file serves as a json object for in-app customizable settings.
- The `/config/database.js` file serves as a quick connector to the database, and makes it easy to just import and query. Examples can be found in `/models/`.
- The following was the original workflow used to implement the current capabilities of the backend:
  - `config/app.json` | `config/database.js`
  - `routes/serviceRoutes.js` -> `controllers/serviceController.js` -> `models/serviceModel.js`

# Code conventions

The project adheres to the following code conventions:
[https://agora.nasqueron.org/Code_conventions](https://agora.nasqueron.org/Code_conventions)

In addition:
-   the project uses single quotes
-   both variables and functions names are in camelCase

# Footnotes
[^1]: (Node Version Manager) NVM is a bash script that allows you to manage multiple versions of Node.js on your system. With NVM, you can easily switch between different versions of Node.js, install new versions, and manage dependencies for each version.
