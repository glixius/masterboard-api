/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { Competitor } from '@masterboard/entities';
import { StoreAdapter } from './store-adapter.interface';

/* ––
 * –––– Service definition
 * –––––––––––––––––––––––––––––––– */
export class CompetitorService {
  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(private storeAdapter: StoreAdapter<Competitor>) {}

  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  getCompetitors() {
    return this.storeAdapter.getAll();
  }

  getCompetitor(competitorId: string) {
    return this.storeAdapter.get(competitorId);
  }
}
