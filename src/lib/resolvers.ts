/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { LeagueController } from '@masterboard/adapters';
import { AirtableFramework } from './airtable.framework';

/* ––
 * –––– Initialize frameworks
 * –––––––––––––––––––––––––––––––– */
const airtable = new AirtableFramework(process.env.AIRTABLE_MASTERBOARD_BASE);
const leagueController = new LeagueController(airtable);

/* ––
 * –––– Resolver declaration
 * –––––––––––––––––––––––––––––––– */
export const rootResolver = {
  league: async ({ leagueId }) => {
    try {
      return await leagueController.getLeague(leagueId);
    } catch (_) {
      return null;
    }
  },
  leagues: async () => {
    return await leagueController.getLeagues();
  },
};
