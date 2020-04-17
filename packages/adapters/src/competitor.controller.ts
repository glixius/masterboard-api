/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { CompetitorService } from '@masterboard/business-logic';
import { AirtableApi } from './airtable-api.interface';
import { AirtableCompetitorAdapter } from './airtable-competitor.adapter';

/* ––
 * –––– Controller declaration
 * –––––––––––––––––––––––––––––––– */
export class CompetitorController {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  competitorService: CompetitorService;

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(api: AirtableApi) {
    this.competitorService = new CompetitorService(new AirtableCompetitorAdapter(api));
  }
  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  async getCompetitors() {
    try {
      return await this.competitorService.getCompetitors();
    } catch (_) {
      return null;
    }
  }
  async getCompetitor(competitorId: string) {
    if (!competitorId) {
      return null;
    }

    try {
      return await this.competitorService.getCompetitor(competitorId);
    } catch (_) {
      return null;
    }
  }
}
