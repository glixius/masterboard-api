/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

// App imports
import { Sport, buildSourceSportResolver } from './sport.type';
import { SportFormatController } from '@masterboard/adapters';
import { AirtableFramework } from '../airtable.framework';
import { SportFormat as SportFormatModel } from '@masterboard/entities';

/* ––
 * –––– Framework initialization
 * –––––––––––––––––––––––––––––––– */
const airtable = new AirtableFramework(process.env.AIRTABLE_MASTERBOARD_BASE);
const sportFormatController = new SportFormatController(airtable);

/* ––
 * –––– Resolvers declaration
 * –––––––––––––––––––––––––––––––– */
// Exported resolvers
export const getSportFormats = () => sportFormatController.getSportFormats();
export const getSportFormat = (_: any, { sportFormatId }: { sportFormatId: string }) =>
  sportFormatController.getSportFormat(sportFormatId);

// Exported resolver builders
export const buildSourceSportFormatsResolver = (property: string) => {
  return (source: { [key: string]: any }) =>
    source[property].map((sportFormat: string | SportFormatModel) => {
      if (sportFormat instanceof SportFormatModel) {
        return sportFormatController.getSportFormat(sportFormat.id);
      }

      return sportFormatController.getSportFormat(sportFormat);
    });
};
export const buildSourceSportFormatResolver = (property: string) => {
  return (source: { [key: string]: any }) => sportFormatController.getSportFormat(source[property]);
};

/* ––
 * –––– Type definition
 * –––––––––––––––––––––––––––––––– */
export const SportFormat = new GraphQLObjectType({
  name: 'SportFormat',
  description: 'A specific game mode for a sport',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: `Sport format unique identifier`,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Sport format name',
    },
    sport: {
      type: new GraphQLNonNull(Sport),
      description: `Format's associated sport`,
      resolve: buildSourceSportResolver('sport'),
    },
  }),
});
