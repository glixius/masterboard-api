/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Platform imports
const express = require('express');

// Third-party imports
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const Airtable = require('airtable');

// App imports
const checkEnvironmentVariables = require('./setup/environment-variables');

/* ––
 * –––– Environment varibles validation
 * –––––––––––––––––––––––––––––––– */
console.log(`\n🥇 Masterboard API 🥇`.underline.magenta.bold);

const isEnvironmnetSetup = checkEnvironmentVariables();

if (!isEnvironmnetSetup) {
  console.log(
    `🛑  Environment does not meet required variables. Check README.md for setting up environment variables. Aborting.`
      .red.bold
  );
  return;
}
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
console.log('🚀  Starting web server\n'.green.underline.bold);

const application = express();
const port = process.env.PORT || 3000;

application.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: process.env.GRAPHIQL_ENABLED,
  })
);

application.listen(port, () => {
  console.log(
    `Masterboard API v${process.env.npm_package_version} is running`.green
  );
  console.log(`URL: http://localhost:${port}`.green);
});
