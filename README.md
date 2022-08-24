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

1. Create A record in Hosted Zone (e.g. mybahmni.in)
   abdm-proxy.lite.mybahmni.in
   Alias to network load balancer - select the elb

2. apply ingress in default namespace
   kubectl apply -f ingress.yaml

3. apply abdm proxy in default namespace
   kubectl apply -f abdm-callback.proxy.yaml

no resolver defined to resolve lite.mybahmni.in, client: 10.0.1.10, server: localhost, request: "GET /callback HTTP/1.1", host: "abdm-proxy.lite.mybahmni.in", referrer: ""
