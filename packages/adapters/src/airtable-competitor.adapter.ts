/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { Competitor } from '@masterboard/entities';
import { competitorSchema, AirtableRecordSchema } from './airtable.schema';
import { AirtableStoreAdapter } from './airtable-store.adapter';
import { AirtableRecord } from './airtable-api.interface';

/* ––
 * –––– Adapter declaration
 * –––––––––––––––––––––––––––––––– */
export class AirtableCompetitorAdapter extends AirtableStoreAdapter<Competitor> {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  schema: AirtableRecordSchema = competitorSchema;

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––– */
  transformRecord(airtableRecord: AirtableRecord) {
    return new Competitor(this.convertToRaw(airtableRecord));
  }
}
