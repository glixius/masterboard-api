/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportService } from '@masterboard/business-logic';
import { AirtableApi } from './airtable-api.interface';
import { AirtableSportAdapter } from './airtable-sport.adapter';

/* ––
 * –––– Controller declaration
 * –––––––––––––––––––––––––––––––– */
export class SportController {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  sportService: SportService;

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(private api: AirtableApi) {
    this.sportService = new SportService(new AirtableSportAdapter(api));
  }

  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  async getSports() {
    try {
      return await this.sportService.getSports();
    } catch (_) {
      return null;
    }
  }

  async getSport(id: string) {
    if (!id) {
      return null;
    }

    try {
      return await this.sportService.getSport(id);
    } catch (_) {
      return null;
    }
  }
}
