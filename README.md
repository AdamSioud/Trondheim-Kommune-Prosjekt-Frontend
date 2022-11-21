# Trondheim Kommune Kundeprosjekt

## Presentation
Trondheim Kommune has commissioned a group of students to create a prototype to find out the best place to live in Trondheim according to certain criteria

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

## Folder structure
<pre>

.
├── README.md
├── babel.config.js
├── jest.config.js
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
    ├── App.vue
    ├── assets
    │   ├── configParameters.json
    │   ├── logo.png
    │   ├── param_input.json
    │   └── stylesheets
    │       └── reset.css
    ├── components
    │   ├── AppAge.vue
    │   ├── AppCard.vue
    │   ├── AppCheckbox.vue
    │   ├── AppDiagram.vue
    │   ├── AppEnvironment.vue
    │   ├── AppMenuCollapse.vue
    │   ├── AppPrice.vue
    │   ├── AppSlider.vue
    │   ├── HelloI18n.vue
    │   ├── HelloWorld.vue
    │   ├── TheDetails.vue
    │   ├── TheMap.vue
    │   ├── TheParameters.vue
    │   ├── TheParametersDistanceInput.vue
    │   ├── TheParametersDistanceInputPoint.vue
    │   └── TheParametersMenuCollapse.vue
    ├── helpers
    │   ├── convertersValueParameters.ts
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
        ├── HomeView.vue
        └── MapView.vue
├── tests
    └── unit
        ├── components
        └── helpers
            └── utils.spec.ts
├── tsconfig.json
└── vue.config.js
.

</pre>
