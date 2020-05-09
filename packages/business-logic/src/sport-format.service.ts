/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportFormat } from '@masterboard/entities';
import { StoreAdapter } from './store-adapter.interface';

/* ––
 * –––– Service declaration
 * –––––––––––––––––––––––––––––––– */
export class SportFormatService {
  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(private storeAdapter: StoreAdapter<SportFormat>) {}

  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  getSportFormats() {
    return this.storeAdapter.getAll();
  }

  getSportFormat(sportFormatId: string) {
    return this.storeAdapter.get(sportFormatId);
  }
}
