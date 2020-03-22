/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Platform imports
import express from 'express';

// Third-party imports
import graphqlHTTP from 'express-graphql';
import playground from 'graphql-playground-middleware-express';
import 'colors';

// App imports
import { checkEnvironmentVariables } from './setup/environment-variables';
import { schema } from './lib/api.schema';
import { rootResolver } from './lib/resolvers';

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
} else {
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
}
