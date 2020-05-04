/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportFormat } from '@masterboard/entities';
import { sportFormatsSchema, AirtableRecordSchema } from './airtable.schema';
import { AirtableStoreAdapter } from './airtable-store.adapter';
import { AirtableRecord } from './airtable-api.interface';

/* ––
 * –––– Adapter declaration
 * –––––––––––––––––––––––––––––––– */
export class AirtableSportFormatAdapter extends AirtableStoreAdapter<SportFormat> {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  schema: AirtableRecordSchema = sportFormatsSchema;

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––– */
  transformRecord(airtableRecord: AirtableRecord) {
    return new SportFormat(this.convertToRaw(airtableRecord));
  }
}
