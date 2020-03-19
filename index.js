/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Platform imports
const express = require('express');

// Third-party imports
const graphqlHTTP = require('express-graphql');
const playground = require('graphql-playground-middleware-express').default;

// App imports
const checkEnvironmentVariables = require('./setup/environment-variables');
const schema = require('./lib/api.schema');
const rootResolver = require('./lib/resolvers/resolvers');

/* ––
 * –––– Environment validation
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
 * –––– Server initialization
 * –––––––––––––––––––––––––––––––– */
console.log('🚀  Starting web server\n'.green.underline.bold);

const application = express();
const port = process.env.PORT || 3000;

application.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: rootResolver,
  })
);

// Expose playground if enabled.
if (process.env.PLAYGROUND_ENABLED) {
  application.get(
    '/playground',
    playground({ endpoint: '/graphql', workspaceName: 'Masterboard' })
  );
}

application.listen(port, () => {
  console.log(`Masterboard API v${process.env.npm_package_version} is running`.green);
  console.log(`URL: http://localhost:${port}`.green);
});
