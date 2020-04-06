/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';

// App imports
import { League } from './league.type';

/* ––
 * –––– Type definition
 * –––––––––––––––––––––––––––––––– */
export const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Masterboard query type',
  fields: {
    leagues: {
      type: new GraphQLNonNull(new GraphQLList(League)),
      description: 'Query for retrieving a list of leagues',
    },
    league: {
      type: League,
      args: {
        leagueId: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'League unique identifier',
        },
      },
      description: 'Query for retrieving an specific league object based on passed in id',
    },
  },
});
