# ts-autocomplete

Autocomplete component built using React + Typescript. No external libraries for development, testing is done using React Testing Library, Bundling using Vite.

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
- Prettier enforced style
- Strictly Typed
- Unit tests with React Testing Library
- Husky pre-push & pre-commit hooks
- Github Actions CI / CD
- Netfliy CI / CD

### CI / CD

[![Netlify Status](https://api.netlify.com/api/v1/badges/110ec474-2f3c-4785-9ff8-156c29d5dfa2/deploy-status)](https://app.netlify.com/sites/splendorous-baklava-4774d0/deploys)

[![Node.js CI](https://github.com/AntonioErdeljac/ts-autocomplete/actions/workflows/node.js.yml/badge.svg)](https://github.com/AntonioErdeljac/ts-autocomplete/actions/workflows/node.js.yml)

[Live version](https://splendorous-baklava-4774d0.netlify.app/)

### Lint

[![eslint: airbnb](https://img.shields.io/badge/Eslint-Airbnb-red?logo=airbnb&style=flat)](https://github.com/airbnb/javascript)
[![code style: prettier](https://img.shields.io/badge/Code%20Style-Prettier-red?logo=prettier&style=flat)](https://github.com/prettier/prettier)

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/ts-autocomplete.git
```

### Install packages

```shell
npm i
```

### Start the app

```shell
npm start
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `start`         | Starts a development instance of the app |
| `build`         | Creates a production bundle              |
| `preview`       | Preview build bundle                     |
| `test`          | Runs tests                               |
| `test:watch`    | Runs tests in watch / update mode        |
| `test:coverage` | Runs tests in coverage mode              |

## Available props

Available props for the component

| prop               | description                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `value`            | Controlled value                                                                                                                        |
| `onChange`         | Function to call on input change                                                                                                        |
| `getData`          | Async function to filter data, default a TS function using RegEx to match value with initial data Can be used to pass custom API calls. |
| `valueExtractor`   | Function to recognize "value / id" from given options data, Default (option) => option.value                                            |
| `labelExtractor`   | Function to recognize "label" from given options data, Default (option) => option.label                                                 |
| `options`          | Data to render / filter                                                                                                                 |
| `placeholder`      | Input placeholder                                                                                                                       |
| `onFocus`          | Function to call on input focus                                                                                                         |
| `onBlur`           | Function to call on input blur                                                                                                          |
| `onItemClick`      | Function to call on results item click                                                                                                  |
| `loading`          | Control whether component is loading                                                                                                    |
| `disabled`         | Control whether component is disabled                                                                                                   |
| `maxResultsHeight` | Control the height of results wrapper                                                                                                   |
