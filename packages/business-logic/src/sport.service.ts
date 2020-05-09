/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { Sport } from '@masterboard/entities';
import { StoreAdapter } from './store-adapter.interface';

/* ––
 * –––– Service declaration
 * –––––––––––––––––––––––––––––––– */
export class SportService {
  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(private storeAdapter: StoreAdapter<Sport>) {}

  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  getSports() {
    return this.storeAdapter.getAll();
  }

  getSport(sportId: string) {
    return this.storeAdapter.get(sportId);
  }
}
