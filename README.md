# ts-autocomplete

Autocomplete component built using React + Typescript. No external libraries.

Features:

- Search
- Show results
- Highlight matching part of search and results
- Click on result and close results
- Use keyboard arrows to navigate results
- Custom label & value extractors to fit any kind of data object
- Custom data filters, pass any fetch / axios method to receive data
- BEM type of CSS classes
- Components & Fragments folder structure
- ESlint enforced style
- Strictly Typed

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

| command   | description                                                    |
| :-------- | :------------------------------------------------------------- |
| `start`   | Starts a development instance of app on http://localhost:3000/ |
| `build`   | Creates a production bundle                                    |
| `preview` | Starts Vite preview server                                     |

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
