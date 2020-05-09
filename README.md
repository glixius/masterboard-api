# Masterboard API

API implementation for Masterboard Application.

## Building blocks

API is built using following technologies:

- **Node.js:** Base programming language.
- **express.js:** Node web framework.
- **Typescript:** Super set of javascript.
- **Jest:** Testing framework.
- **yarn:** Package manager.
- **GraphQL:** API query language.
- **Airtable:** Datasource library.

## Project architecture

This is a monorepo project with workspaces based on [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). So, you'll find the following packages:

- `@masterboard/entities`: Organization wide entities and logic. It should be shared among multiple applications.
- `@masterboard/business-logic`: Application related business logic.
- `@masterboard/adapters`: Application interface adapters for implementing frameworks.
- `masterboard-api`: Masterboard's web API implementation. This is the repository's root project.

## API

This API expose the following entities. Use them based on your needs:

- **Competitor**: A user member of any Materboard league.
- **League**: A competitors organization for running sport tournaments.
- **Sport**: A discipline based on predefined rules with competitive purposes.
- **SportFormat**: A specific ruleset mode derived from a particular sport.

You could find complete documentation on GraphQL Schema documentation after [running this project](#running).

## Setup

In order to setup your environment you need to have `node` and `yarn` installed globally. Once you have them run `yarn` command to install project dependencies.

This project uses `editorconfig`, `typescript`, `tslint` and `prettier` for formatting code. Check your IDE extensions for proper support.

Finally, our project depends on some environment variables. Whithin `/env` folder you will find a `env.sample`. Create an `.env` file, copy `.env.sample` content and setup your variables based on your needs.

## Environment variables

- **PORT:** Server port used for exposing our API.
- **PLAYGROUND_ENABLED:** Whether GraphQL playground IDE will be available for debugging.
- **AIRTABLE_API_KEY:** Airtable account API key.
- **AIRTABLE_MASTERBOARD_BASE:** Airtable's base id.

## Running

For running project you need to run the following commands:

```shell
# Compile typescript into javascript
yarn build:packages

# Run node code.
yarn start
```

## Testing

You can execute API tests using the following command:

```shell
yarn test
```

You can also use `--watch` flag for development purposes and `--verbose` if you want details about running tests.

If you want to run specific package tests, run the following commands:

```shell
# Navigate to package folder
cd packages/__desired-package__

# Run tests
yarn test
```

If you want to run all tests, execute the following command.

```shell
yarn test:all
```
