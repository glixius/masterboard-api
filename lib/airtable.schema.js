/* ––
 * –––– Schema declaration
 * –––––––––––––––––––––––––––––––– */
const airtableSchema = {
  Leagues: {
    tableName: 'Leagues',
    name: 'Name',
    members: 'Members',
    code: 'Code',
  },
};

/* ––
 * –––– Exports
 * –––––––––––––––––––––––––––––––– */
module.exports = airtableSchema;
