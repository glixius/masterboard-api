/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
const { getLeagues, getLeague } = require('../airtable.service');
const LeagueResolver = require('./league.resolver');

/* ––
 * –––– Resolver declaration
 * –––––––––––––––––––––––––––––––– */
const root = {
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

/* ––
 * –––– Exports
 * –––––––––––––––––––––––––––––––– */
module.exports = root;
