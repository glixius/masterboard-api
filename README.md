# Masterboard API

API implementation for Masterboard Application.

## Building blocks

API is built using following technologies:

- **Node.js:** Base programming language.
- **express.js:** Node web framework.
- **Jest:** Testing framework.
- **yarn:** Package manager.
- **GraphQL:** API query language.
- **Airtable:** Datasource library.

## Setup

In order to setup your environment you need to have `node` and `yarn` installed globally. Once you have them run `yarn` command to install project dependencies.

This project uses `Editorconfig` and `prettier` for formatting code. Check your IDE extensions for proper support.

Finally, our project depends on some environment variables. Whithin `/env` folder you will find a `env.sample`. Create an `.env` file, copy `.env.sample` content and setup your variables based on your needs.

## Environment variables

- **PORT:** Server port used for exposing our API.
- **GRAPHIQL_ENABLED:** Whether GraphiQL will be enabled for debugging.
- **AIRTABLE_API_KEY:** Airtable account API key.
- **AIRTABLE_MASTERBOARD_BASE:** Airtable's base id.

## Running

For running project you need to run the following command:

```shell
yarn start
```

## Testing

You can execute API tests using the following command:

```shell
yarn test
```
