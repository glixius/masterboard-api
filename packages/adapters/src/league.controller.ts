/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { LeagueService } from '@masterboard/business-logic';
import { AirtableApi } from './airtable-api.interface';
import { AirtableLeagueAdapter } from './airtable-league.adapter';

/* ––
 * –––– Controller declaration
 * –––––––––––––––––––––––––––––––– */
export class LeagueController {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  leagueService: LeagueService;

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(private api: AirtableApi) {
    this.leagueService = new LeagueService(new AirtableLeagueAdapter(api));
  }

  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  async getLeagues() {
    try {
      return await this.leagueService.getLeagues();
    } catch (_) {
      return null;
    }
  }

  async getLeague(id: string) {
    if (!id) {
      return null;
    }

    try {
      return await this.leagueService.getLeague(id);
    } catch (_) {
      return null;
    }
  }
}
