# Trondheim Kommune Kundeprosjekt

## Presentation

Trondheim Kommune has commissioned a group of students to create a prototype to find out the best place to live in
Trondheim according to certain criteria

This project is divided into two parts, this repository is the interface part (frontend).

You can find the server part (backend) here: https://github.com/AdamSioud/Trondheim-Kommune-Kundeprosjekt

## Installation (Windows and Mac)

### Project setup

```
npm install
```

### In ``.env.local``

```
VUE_APP_BASE_URL=http://localhost:5001/
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

## Installation (Docker)

### Build the image

```
docker build -f DockerFile -t front-trondheim .
```

### Run the image

```
docker run -p 8081:80 front-trondheim:latest 
```

## Configuration

In order to allow the modification of the interface in a simple way, we have set up three configuration files:

<details>
<summary><code>param_input.json</code></summary>

This file is located [``/src/assets/config/param_input.json``](/src/assets/config/param_input.json)

In this file, you can find the default configuration of the parameters
</details>

<details>
<summary><code>config_parameters.json</code></summary>

This file is located [``/src/assets/config/config_parameters.json``](/src/assets/config/config_parameters.json)

In this file you can find the configuration for administering the parameters interface.
It is here that we will define the type of inputs, the menus and others.

In [``/src/type.ts``](/src/type.ts) we can find the type ``ConfigParameters`` which describes the structure of the file
</details>

<details>
<summary><code>config_details.json</code></summary>

This file is located [``/src/assets/config/config_details.json``](/src/assets/config/config_details.json)

In this file, we can find the configuration to manage the details interface.
It is here that we will define how to take into account the results of the server and how to display the diagrams

In [``/src/type.ts``](/src/type.ts) we can find the type `ConfigDetails` which describes the structure of the file
</details>

## Folder structure

<pre>
├── DockerFile
├── README.md
├── babel.config.js
├── jest.config.js
├── nginx.conf
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
    ├── App.vue
    ├── assets
    │   ├── config
    │   │   ├── config_details.json
    │   │   ├── config_parameters.json
    │   │   └── param_input.json
    │   └── stylesheets
    │       ├── _mixins.scss
    │       ├── _variables.scss
    │       └── reset.css
    ├── classes
    │   └── CustomError.ts
    ├── components
    │   ├── AppCard.vue
    │   ├── AppCheckbox.vue
    │   ├── AppLocaleChanger.vue
    │   ├── AppMenuCollapse.vue
    │   ├── AppModal.vue
    │   ├── AppSlider.vue
    │   ├── TheDetails.vue
    │   ├── TheMap.vue
    │   ├── TheParameters.vue
    │   └── TheParametersMenuCollapse.vue
    ├── helpers
    │   ├── convertersParameters.ts
    │   ├── convertersValueParameters.ts
    │   ├── cookiesUtils.ts
    │   └── utils.ts
    ├── i18n.ts
    ├── locales
    │   ├── en.json
    │   └── nb.json
    ├── main.ts
    ├── router
    │   └── index.ts
    ├── stores
    │   └── error.ts
    ├── type.ts
    └── views
        ├── AboutView.vue
        ├── Error404View.vue
        └── MapView.vue
├── tests
    └── unit
        └── helpers
            ├── converters.spec.ts
            ├── cookiesUtils.spec.ts
            └── utils.spec.ts
├── tsconfig.json
└── vue.config.js
</pre>
