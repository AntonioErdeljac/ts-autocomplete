# ts-autocomplete

Autocomplete component built using React + Typescript. No external libraries.

### CI / CD

[![Netlify Status](https://api.netlify.com/api/v1/badges/d4f2024b-4fba-430c-aa3a-d6b413c9899a/deploy-status)](https://app.netlify.com/sites/nimble-treacle-013c0b/deploys)

[Live version](https://nimble-treacle-013c0b.netlify.app/)

### Lint

[![eslint: airbnb](https://img.shields.io/badge/Eslint-Airbnb-red?logo=airbnb&style=flat)](https://github.com/airbnb/javascript)

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/ts-autocomplete.git
```

### Install packages

```shell
npm i
```

## Available commands

Running commands with npm `npm run [command]`

| command   | description                          |
| :-------- | :----------------------------------- |
| `start`   | Starts a development instance of app |
| `build`   | Creates a production bundle          |
| `preview` | Starts Vite preview server           |

## Autocomplete props

Available props for the component

| prop             | description                                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `value`          | Controlled value                                                                                                                        |
| `onChange`       | Function to call on input change                                                                                                        |
| `dataFilter`     | Async function to filter data, default a TS function using RegEx to match value with initial data Can be used to pass custom API calls. |
| `valueExtractor` | Function to recognize "value / id" from given options data, Default (option) => option.value                                            |
| `labelExtractor` | Function to recognize "label" from given options data, Default (option) => option.label                                                 |
| `options`        | Data to render / filter                                                                                                                 |
