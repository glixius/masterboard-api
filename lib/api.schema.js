/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
const { buildSchema } = require('graphql');

/* ––
 * –––– Schema definition
 * –––––––––––––––––––––––––––––––– */
const schema = buildSchema(`
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

/* ––
 * –––– Exports
 * –––––––––––––––––––––––––––––––– */
module.exports = schema;
