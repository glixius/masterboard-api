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
  getLeagues() {
    return this.leagueService.getLeagues();
  }

  getLeague(id: string) {
    return this.leagueService.getLeague(id);
  }
}
