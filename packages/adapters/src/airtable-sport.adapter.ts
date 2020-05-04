/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { Sport } from '@masterboard/entities';
import { sportsSchema, AirtableRecordSchema } from './airtable.schema';
import { AirtableStoreAdapter } from './airtable-store.adapter';
import { AirtableRecord } from './airtable-api.interface';

/* ––
 * –––– Adapter declaration
 * –––––––––––––––––––––––––––––––– */
export class AirtableSportAdapter extends AirtableStoreAdapter<Sport> {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  schema: AirtableRecordSchema = sportsSchema;

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––– */
  transformRecord(airtableRecord: AirtableRecord) {
    return new Sport(this.convertToRaw(airtableRecord));
  }
}
