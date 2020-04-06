/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';

// App imports
import { League } from './league.type';
import { AirtableFramework } from '../airtable.framework';
import { LeagueController } from '@masterboard/adapters';

/* ––
 * –––– Framework initialization
 * –––––––––––––––––––––––––––––––– */
const airtable = new AirtableFramework(process.env.AIRTABLE_MASTERBOARD_BASE);
const leagueController = new LeagueController(airtable);

/* ––
 * –––– Resolvers declaration
 * –––––––––––––––––––––––––––––––– */
const getLeagues = async () => await leagueController.getLeagues();
const getLeague = async (_: any, { leagueId }: { leagueId: string }) => {
  try {
    return await leagueController.getLeague(leagueId);
  } catch (_) {
    return null;
  }
};

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
      resolve: getLeagues,
    },

    league: {
      type: League,
      description: 'Query for retrieving an specific league object based on passed in id',
      args: {
        leagueId: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'League unique identifier',
        },
      },
      resolve: getLeague,
    },
  },
});
