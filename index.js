/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Platform imports
const express = require('express');

// Third-party imports
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const Airtable = require('airtable');

/* ––
 * –––– Schema definition
 * –––––––––––––––––––––––––––––––– */
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

/* ––
 * –––– Datasource connection
 * –––––––––––––––––––––––––––––––– */
const masterboardBase = Airtable.base(process.env.AIRTABLE_MASTERBOARD_BASE);

/* ––
 * –––– Resolver declaration
 * –––––––––––––––––––––––––––––––– */
const root = {
  hello: async () => {
    const competitor = await masterboardBase('Competitors').find(
      'rectTNXF39gMvWh8W'
    );
    return competitor.get('Nickname');
  },
};

/* ––
 * –––– Server initialization
 * –––––––––––––––––––––––––––––––– */
const application = express();

application.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: process.env.GRAPHIQL_ENABLED,
  })
);

application.listen(process.env.PORT);
console.log(`🚀🚀 Masterboard API v${process.env.npm_package_version} 🚀🚀`);
