/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { League } from '@masterboard/entities';
import { StoreAdapter } from './store-adapter.interface';

/* ––
 * –––– Service declaration
 * –––––––––––––––––––––––––––––––– */
export class LeagueService {
  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(private storeAdapter: StoreAdapter<League>) {}

  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  getLeagues() {
    return this.storeAdapter.getAll();
  }

  getLeague(leagueId: string) {
    return this.storeAdapter.get(leagueId);
  }
}
