/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';

// App imports
import { Competitor, buildSourceCompetitorsResolver } from './competitor.type';
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
// Exported resolvers
export const getLeagues = () => leagueController.getLeagues();
export const getLeague = (_: any, { leagueId }: { leagueId: string }) =>
  leagueController.getLeague(leagueId);

// Exported resolver builders
export const buildSourceLeaguesResolver = (property: string) => {
  return (source: { [key: string]: any }) =>
    source[property].map((leagueId: string) => leagueController.getLeague(leagueId));
};
export const buildSourceLeagueResolver = (property: string) => {
  return (source: { [key: string]: any }) => leagueController.getLeague(source[property]);
};

/* ––
 * –––– Type definition
 * –––––––––––––––––––––––––––––––– */
export const League = new GraphQLObjectType({
  name: 'League',
  description: 'A competitors organization for running tournaments',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `League's unique identifier`,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name given to league',
    },
    code: {
      type: GraphQLString,
      description: `Invitation code for joining this league`,
    },
    members: {
      type: new GraphQLNonNull(new GraphQLList(Competitor)),
      description: 'List of competitors associated with this league',
      resolve: buildSourceCompetitorsResolver('members'),
    },
  }),
});
