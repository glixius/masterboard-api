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
    const rawData = this.convertToRaw(airtableRecord) as { id: string; formats: any[] };
    rawData.formats =
      (Array.isArray(rawData.formats) &&
        rawData.formats.map((sportFormatId: string) => ({ id: sportFormatId }))) ||
      [];
    return new Sport(rawData);
  }
}
