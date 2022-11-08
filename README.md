# front-trondheim-kommune-kundeprosjekt

## Project setup
```
npm install
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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Folder structure
<pre>
.
├── README.md
└── server
    ├── README.md
    ├── app.py
    ├── model
    │   ├── generated_map.html
    │   ├── src
    │   │   ├── data
    │   │   │   ├── data.geojson
    │   │   │   ├── data.py
    │   │   │   └── data_interval.json
    │   │   ├── models.py
    │   │   └── parameters
    │   │       ├── age_param.py
    │   │       ├── culture_param.py
    │   │       ├── distance_param.py
    │   │       ├── environment_param_interface.py
    │   │       ├── grocery_param.py
    │   │       ├── noise_param.py
    │   │       ├── outdoor_param.py
    │   │       ├── param_interface.py
    │   │       ├── price_param.py
    │   │       ├── safety_param.py
    │   │       ├── transport_param.py
    │   │       ├── walkway_param.py
    │   │       └── well_being_param.py
    │   └── test
    │       ├── mock_data
    │       │   ├── age.json
    │       │   ├── distance.json
    │       │   ├── general_df.json
    │       │   ├── neighborhood.json
    │       │   └── price.json
    │       ├── test_age_param.py
    │       ├── test_distance_param.py
    │       ├── test_models.py
    │       ├── test_noise_param.py
    │       ├── test_price_param.py
    │       └── test_safety_param.py
    └── requirements.txt
</pre>
