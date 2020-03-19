/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
const Airtable = require('airtable');

// App imports
const { Leagues } = require('./airtable.schema');

/* ––
 * –––– Datasource connection
 * –––––––––––––––––––––––––––––––– */
const masterboardBase = Airtable.base(process.env.AIRTABLE_MASTERBOARD_BASE);

/* ––
 * –––– API methods
 * –––––––––––––––––––––––––––––––– */
const getLeagues = () => {
  return masterboardBase(Leagues.tableName)
    .select()
    .all();
};

const getLeague = id => {
  return masterboardBase(Leagues.tableName).find(id);
};

/* ––
 * –––– Exports
 * –––––––––––––––––––––––––––––––– */

module.exports = {
  getLeagues,
  getLeague,
};
