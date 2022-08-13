<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


```bash
$ npm install
```

## BD docker
```bash
  docker-compose up
```

## variables de entorno

Clonar archivo __.env.template.__ y renombrar a __.env__
y llenar variables de entorno


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## reconstruir BD con Semilla

```bash
  http://localhost:3000/api/v2/seed
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## en docker

crear archivo __..env.prod.__ y llenar variables entorno

```sh
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

