/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLSchema } from 'graphql';

// App imports
import { Query } from './query.type';

/* ––
 * –––– Schema instantiation
 * –––––––––––––––––––––––––––––––– */
export const schema = new GraphQLSchema({
  query: Query,
});
