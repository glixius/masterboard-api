/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import { buildSchema } from 'graphql';

/* ––
 * –––– Schema definition
 * –––––––––––––––––––––––––––––––– */
export const schema = buildSchema(`
  type League {
    id: ID!
    name: String!
    code: String
    members: [String]!
  }

  type Query {
    leagues: [League]!
    league(leagueId: String!): League
  }
`);
