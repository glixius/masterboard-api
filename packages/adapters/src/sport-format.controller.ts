/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportFormatService } from '@masterboard/business-logic';
import { AirtableApi } from './airtable-api.interface';
import { AirtableSportFormatAdapter } from './airtable-sport-format.adapter';

/* ––
 * –––– Controller declaration
 * –––––––––––––––––––––––––––––––– */
export class SportFormatController {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  sportFormatService: SportFormatService;

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(private api: AirtableApi) {
    this.sportFormatService = new SportFormatService(new AirtableSportFormatAdapter(api));
  }

  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  async getSportFormats() {
    try {
      return await this.sportFormatService.getSportFormats();
    } catch (_) {
      return null;
    }
  }

  async getSportFormat(id: string) {
    if (!id) {
      return null;
    }

    try {
      return await this.sportFormatService.getSportFormat(id);
    } catch (_) {
      return null;
    }
  }
}
