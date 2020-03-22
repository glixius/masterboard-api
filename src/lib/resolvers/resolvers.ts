/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { getLeagues, getLeague } from '../airtable.service';
import { LeagueResolver } from './league.resolver';

/* ––
 * –––– Resolver declaration
 * –––––––––––––––––––––––––––––––– */
export const rootResolver = {
  league: async ({ leagueId }) => {
    try {
      const league = await getLeague(leagueId);
      return new LeagueResolver(league);
    } catch (_) {
      return null;
    }
  },
  leagues: async () => {
    const leagues = await getLeagues();
    return leagues.map(league => new LeagueResolver(league));
  },
};
