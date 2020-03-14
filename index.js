/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Platform imports
const express = require('express');

// Third-party imports
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

/* ––
 * –––– Schema definition
 * –––––––––––––––––––––––––––––––– */
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

/* ––
 * –––– Resolver declaration
 * –––––––––––––––––––––––––––––––– */
const root = {
  hello: () => 'Masterboard API is here for you! 👋🏽',
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
