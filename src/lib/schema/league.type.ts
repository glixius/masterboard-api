/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';

/* ––
 * –––– Type definition
 * –––––––––––––––––––––––––––––––– */
export const League = new GraphQLObjectType({
  name: 'League',
  description: 'A competitors organization for running tournaments',
  fields: {
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
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'List of competitors associated with this league',
    },
  },
});
