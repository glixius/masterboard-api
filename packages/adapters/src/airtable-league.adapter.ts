/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { League } from '@masterboard/entities';
import { leagueSchema, AirtableRecordSchema } from './airtable.schema';
import { AirtableStoreAdapter } from './airtable-store.adapter';
import { AirtableRecord } from './airtable-api.interface';

/* ––
 * –––– Adapter declaration
 * –––––––––––––––––––––––––––––––– */
export class AirtableLeagueAdapter extends AirtableStoreAdapter<League> {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  schema: AirtableRecordSchema = leagueSchema;

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––– */
  transformRecord(airtableRecord: AirtableRecord) {
    return new League(this.convertToRaw(airtableRecord));
  }
}
