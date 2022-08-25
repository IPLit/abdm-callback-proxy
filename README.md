# Bahmni ABDM Proxy

![Design](https://raw.githubusercontent.com/Bahmni/bahmni-diagrams/main/abdm/ABDM_proxy.png)

## [Documentation](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/3062005761/Bahmni+ABDM+proxy+to+Simulate+HRP)

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

Build docker image:

```bash
docker build -t abdm-callback-proxy .
```

Run docker container:

```bash
docker run -d -p 8080:80 --name abdm-callback-proxy abdm-callback-proxy
```

After code changes run below command to build and recreate the container

```bash
yarn refresh
```

you should be able to see the application running on [http://localhost:8080](http://localhost:8080).
