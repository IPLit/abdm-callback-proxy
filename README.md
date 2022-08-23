# Bahmni ABDM Gateway Proxy 🧨

![](https://media.giphy.com/media/dv78V39sfMssrjpHWO/giphy.gif)

<a href="https://media.giphy.com/media/dv78V39sfMssrjpHWO/giphy.gif">via GIPHY</a>

## Motivation


## Tech stack
- [ts-auto-mock](https://typescript-tdd.github.io/ts-auto-mock/): Typescript mocking library
- [NJS](https://nginx.org/en/docs/njs/index.html): Nginx Javascript module
- [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html): typescript compiler
- [ts-jest](https://kulshekhar.github.io/ts-jest/): Testing Typescript with jest

## Development

Installation
```bash
yarn install
```

Run unit test
```bash
yarn test
```

Create production build
```bash
yarn build
```


## Installation

1. Build docker image:

```bash
docker build -t abdm-callback-proxy .
```

2. Run nginx docker container:

```bash
docker run -d -p 8080:80 --name abdm-callback-proxy abdm-callback-proxy
```
you should be able to see the application running on [http://localhost:8080](http://localhost:8080).

