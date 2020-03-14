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
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyOEWZiDgb94JtoB',
});

const masterboardBase = Airtable.base('appQUH4JNbaicMWHt');

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
    graphiql: true,
  })
);

application.listen(3000);
console.log('🚀🚀 Masterboard API v1.0.0-alpha.0 🚀🚀');
