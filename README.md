# Bahmni ABDM Gateway Proxy

![Design](https://raw.githubusercontent.com/Bahmni/bahmni-diagrams/main/abdm/ABDM_proxy.png)

## Motivation

TODO: Write the context for the proxy and single tenenat namespace based solution for bahmni clinics

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
