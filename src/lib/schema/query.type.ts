/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';

// App imports
import { League, getLeague, getLeagues } from './league.type';
import { Competitor, getCompetitor, getCompetitors } from './competitor.type';
import { SportFormat, getSportFormat, getSportFormats } from './sport-format.type';
import { Sport, getSport, getSports } from './sport.type';

/* ––
 * –––– Type definition
 * –––––––––––––––––––––––––––––––– */
export const Query = new GraphQLObjectType<any, any, any>({
  name: 'Query',
  description: 'Masterboard query type',
  fields: {
    leagues: {
      type: new GraphQLList(new GraphQLNonNull(League)),
      description: 'Query for retrieving a list of leagues',
      resolve: getLeagues,
    },

    league: {
      type: League,
      description: 'Query for retrieving a specific league object based on passed in id',
      args: {
        leagueId: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'League unique identifier',
        },
      },
      resolve: getLeague,
    },

    competitors: {
      type: new GraphQLList(new GraphQLNonNull(Competitor)),
      description: 'Query for retrieving all registered competitors',
      resolve: getCompetitors,
    },

    competitor: {
      type: Competitor,
      description: 'Query for retrieving a specific competitor object based on passed in id',
      args: {
        competitorId: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Competitor unique identifier',
        },
      },
      resolve: getCompetitor,
    },

    sportFormats: {
      type: new GraphQLList(new GraphQLNonNull(SportFormat)),
      description: 'Query for retrieving all registered sport formats',
      resolve: getSportFormats,
    },

    sportFormat: {
      type: SportFormat,
      description: 'Query for retrieving a specific sport format object based on passed in id',
      args: {
        sportFormatId: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Sport format unique identifier',
        },
      },
      resolve: getSportFormat,
    },

    sports: {
      type: new GraphQLList(new GraphQLNonNull(Sport)),
      description: 'Query for retrieving all registered sports',
      resolve: getSports,
    },

    sport: {
      type: Sport,
      description: 'Query for retrieving a specific sport object based on passed in id',
      args: {
        sportId: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Sport unique identifier',
        },
      },
      resolve: getSport,
    },
  },
});
