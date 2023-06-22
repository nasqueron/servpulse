# How it started
The frontend of ServPulse was created by installing Vue.js version 3.3.2 using the command `npm install vue@3.3.2`.
The following are the choices made during the creation of the app.

```shell
✔ Project name: … <servpulse-frontend>
✔ Add TypeScript? … No
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? … Yes
✔ Add Pinia for state management? … No
✔ Add Vitest for Unit testing? … Yes
✔ Add an End-to-End Testing Solution? … No
✔ Add ESLint for code quality? … Yes
✔ Add Prettier for code formatting? … Yes
```

The file structure for ServPulse has been reorganized to better meet its needs. Please note that while some components and features are not currently part of the project, they are included as an example for organizing the project as it progresses.

# Frontend's structure
```shell
├── .env
├── .env.development
├── README.md
├── index.html
├── package.json
├── vite.config.js
├── vitest.config.js
├── public
│   └── favicon.ico
└── src
    ├── App.vue
    ├── main.js
	├── router
    │   └── index.js
    ├── views
	│   ├── HomeView.vue
    │   ├── LoginView.vue
    │   └── DashboardView.vue
    ├── components
    │   ├── __tests__
    │   │   └── HelloWorld.spec.js
    │   ├── home
    │   │   ├── NavbarSection.vue
    │   │   ├── ServicesComponents
    │   │   │   ├── GroupTitle.vue
    │   │   │   └── Service.vue
    │   │   ├── ServicesSection.vue
    │   │   ├── StatusComponents
    │   │   │   ├── CSSAnimation.vue
    │   │   └── StatusSection.vue
    │   ├── login
    │   │   ├── ExampleComponents
    │   │   │   ├── ElementOfExample.vue
    │   │   └── ExampleSection.vue
    │   └── FooterSection.vue
    ├── plugins
    │   ├── api.js
    │   └── auth.js
    └── assets
        ├── logo.svg
        └── main.css
```

# Insights
- `index.html`: This file is the entry point of the Vue.js app. It contains the basic HTML structure of the app and serves as the template for the app. It is responsible for loading the necessary scripts and stylesheets and defining the root element where the Vue app will be mounted.
- `package.json`: This file is used by Node.js to manage the project's dependencies and scripts. It includes metadata about the project, such as the project name, version, and description. It also lists the dependencies required by the project and any scripts that can be run.
- `vite.config.js` and `vitest.config.js`: These files are configuration files for the Vite build tool. They specify various settings and options for building and running the Vue app.
- `public`: This directory contains static assets that are published, but not processed by the build tools. It typically includes files like `favicon.ico`, which is the icon displayed in the browser tab.
- `src`: This directory contains the core of the Vue app.
  - `App.vue`: This is the top-level component of the Vue app. It defines the structure and behavior of the entire app. It can contain other components and is responsible for rendering the app's content.
  - `main.js`: The entry point to the application, initializes the Vue app, and specifies which HTML element the app should be attached to.
  - `router`: This directory contains the router configuration for the app. It defines the routes and their corresponding components or views.
  - `views`: This directory contains the views or pages of the app. Each view represents a different page or screen of the app and can contain multiple components.
  - `components`: This directory contains reusable components that make up the app's UI. Each component is defined in its own file and can be imported and used in other components or views.
  - `plugins`: This directory contains plugins that can be used to extend the functionality of the Vue app. These plugins are typically used to integrate with external libraries or services.
  - `assets`: This directory is used for storing static assets like images and CSS files. These assets can be processed by the build tools and used in the app.

The above explanation provides a general overview of the common files and directories found in a Vue.js app.

# Notes
- The `.env.development` file serves as a template for the `.env` file, and both files should always mirror each other.
- Vue Single-File Components (SFCs) with the `.vue` extension encapsulate the template, logic, and styling of a Vue component in a single file, consisting of `<template>`, `<script>`, and `<style>` blocks.
