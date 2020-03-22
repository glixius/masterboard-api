/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import Airtable from 'airtable';

// App imports
import { Leagues } from './airtable.schema';

/* ––
 * –––– Datasource connection
 * –––––––––––––––––––––––––––––––– */
const masterboardBase = Airtable.base(process.env.AIRTABLE_MASTERBOARD_BASE);

/* ––
 * –––– API methods
 * –––––––––––––––––––––––––––––––– */
export const getLeagues = () => {
  return masterboardBase(Leagues.tableName)
    .select()
    .all();
};

export const getLeague = id => {
  return masterboardBase(Leagues.tableName).find(id);
};
