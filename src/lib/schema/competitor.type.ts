/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';

// App imports
import { League, buildSourceLeaguesResolver } from './league.type';

/* ––
 * –––– Framework initialization
 * –––––––––––––––––––––––––––––––– */
const competitorController = {
  getCompetitor(competitorId: string) {
    return { id: '', email: '', leagues: [''] };
  },
  getCompetitors() {
    return [];
  },
};

/* ––
 * –––– Resolvers declaration
 * –––––––––––––––––––––––––––––––– */
// Exported resolvers
export const getCompetitors = () => competitorController.getCompetitors();
export const getCompetitor = (_: any, { competitorId }: { competitorId: string }) =>
  competitorController.getCompetitor(competitorId);

// Exported resolver builders
export const buildSourceCompetitorsResolver = (property: string) => {
  return (source: { [key: string]: any }) =>
    source[property].map((competitorId: string) =>
      competitorController.getCompetitor(competitorId)
    );
};
export const buildSourceCompetitorResolver = (property: string) => {
  return (source: { [key: string]: any }) => competitorController.getCompetitor(source[property]);
};

/* ––
 * –––– Type definition
 * –––––––––––––––––––––––––––––––– */
export const Competitor = new GraphQLObjectType({
  name: 'Competitor',
  description: 'A user that is member of Masterboard leagues',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `Competitor unique identifier`,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Competitor email',
    },
    firstname: {
      type: GraphQLString,
      description: `Competitor firstname`,
    },
    lastname: {
      type: GraphQLString,
      description: `Competitor lastname`,
    },
    nickname: {
      type: GraphQLString,
      description: `Competitor nickname`,
    },
    displayName: {
      type: GraphQLString,
      description: `Competitor nickname`,
    },
    leagues: {
      type: new GraphQLNonNull(new GraphQLList(League)),
      description: `Competitor's associated leagues`,
      resolve: buildSourceLeaguesResolver('leagues'),
    },
  }),
});
