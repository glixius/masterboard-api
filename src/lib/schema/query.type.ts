/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';

// App imports
import { League, getLeague, getLeagues } from './league.type';
import { Competitor, getCompetitor, getCompetitors } from './competitor.type';

/* ––
 * –––– Type definition
 * –––––––––––––––––––––––––––––––– */
export const Query = new GraphQLObjectType<any, any, any>({
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

    competitors: {
      type: new GraphQLNonNull(new GraphQLList(Competitor)),
      description: 'Query for retrieving all registered competitors',
      resolve: getCompetitors,
    },

    competitor: {
      type: Competitor,
      description: 'Query for retrieving an specific competitor object based on passed in id',
      args: {
        competitorId: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Competitor unique identifier',
        },
      },
      resolve: getCompetitor,
    },
  },
});
