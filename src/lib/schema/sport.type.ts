/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';

// App imports
import { SportFormat, buildSourceSportFormatsResolver } from './sport-format.type';
import { SportController } from '@masterboard/adapters';
import { AirtableFramework } from '../airtable.framework';

/* ––
 * –––– Framework initialization
 * –––––––––––––––––––––––––––––––– */
const airtable = new AirtableFramework(process.env.AIRTABLE_MASTERBOARD_BASE);
const sportController = new SportController(airtable);

/* ––
 * –––– Resolvers declaration
 * –––––––––––––––––––––––––––––––– */
// Exported resolvers
export const getSports = () => sportController.getSports();
export const getSport = (_: any, { sportId }: { sportId: string }) =>
  sportController.getSport(sportId);

// Exported resolver builders
export const buildSourceSportsResolver = (property: string) => {
  return (source: { [key: string]: any }) =>
    source[property].map((sportId: string) => sportController.getSport(sportId));
};
export const buildSourceSportResolver = (property: string) => {
  return (source: { [key: string]: any }) => sportController.getSport(source[property]);
};

/* ––
 * –––– Type definition
 * –––––––––––––––––––––––––––––––– */
export const Sport = new GraphQLObjectType({
  name: 'Sport',
  description: 'A discipline based on predefined rules with competitive purposes',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `Sport unique identifier`,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Sport name',
    },
    formats: {
      type: new GraphQLList(new GraphQLNonNull(SportFormat)),
      description: 'List of formats associated with this sport',
      resolve: buildSourceSportFormatsResolver('formats'),
    },
  }),
});
