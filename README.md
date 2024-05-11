# HTTP Server in JavaScript

## Objective

This is a JavaScript implementation of an HTTP polls server under [common specifications](https://github.com/tpf-concurrent-benchmarks/docs/tree/main/http_server) defined for multiple languages.

## Deployment

### Requirements

- [Docker >3](https://www.docker.com/) (needs docker swarm)
- [Node >20.12.2](https://www.python.org/) (for local development)

### Configuration

The following environment variables must be defined in the `.env` file:

- `APP_PORT`: The port of the application.
- `SECRET_KEY`: A secret key for encrypting the JWT tokens.
- `SECRET_ALGORITHM`: The algorithm used for encrypting the JWT tokens.
- `SECRET_EXPIRE_TIME`: The expiration time for the JWT tokens, in a [formatted string](https://github.com/vercel/ms).
- `POSTGRES_USER`: The user for the Postgres database.
- `POSTGRES_PASSWORD`: The password for the Postgres database.
- `POSTGRES_HOST`: The host for the Postgres database.
- `POSTGRES_PORT`: The port for the Postgres database.
- `POSTGRES_DB`: The name of the Postgres database.

Example values for every variable can be found in the [.env.example](.env.example) file.

You can copy the file and rename it to `.env` to use it as a base for your configuration:

```bash
cp .env.example .env
```

### Commands

#### Startup

- `make setup`: Sets up everything needed for the application to run in Docker Swarm.

#### Run

- `make deploy`: Builds the necessary Docker images and deploys the application to Docker Swarm, alongside with Graphite, Grafana and cAdvisor.
- `make remove`: Removes all services created by the `deploy` command.

#### Development

- Postgres DB must be accessible.
- `npm install`: Installs the dependencies of the application.
- `make dev`: Runs the application in development mode.

### Monitoring

- Grafana: [http://127.0.0.1:8081](http://127.0.0.1:8081)
- Graphite: [http://127.0.0.1:8080](http://127.0.0.1:8080)

## Used libraries

- [Express](https://expressjs.com/): Web framework for Node.js.
- [Sequelize](https://sequelize.org/): Promise-based Node.js ORM for Postgres and other databases.
- [Zod](https://www.npmjs.com/package/zod)
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Library for hashing passwords.
