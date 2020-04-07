/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { StoreAdapter } from '@masterboard/business-logic';
import { AirtableApi, AirtableRecord } from './airtable-api.interface';
import { AirtableRecordSchema } from './airtable.schema';

/* ––
 * –––– Adapter declaration
 * –––––––––––––––––––––––––––––––– */
export abstract class AirtableStoreAdapter<T> implements StoreAdapter<T> {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  abstract schema: AirtableRecordSchema;

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(private api: AirtableApi) {}

  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  async getAll() {
    try {
      const airtableRecords = await this.api.getAll(this.schema.tableName);
      return airtableRecords.map(airtableRecord => this.transformRecord(airtableRecord));
    } catch (_) {
      throw new Error('AirtableApiAdapter: Could not retrieve records');
    }
  }

  async get(id: string) {
    try {
      const airtableRecord = await this.api.get(this.schema.tableName, id);

      return this.transformRecord(airtableRecord);
    } catch (_) {
      throw new Error('AirtableApiAdapter: Could not retrieve specified record');
    }
  }

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––– */
  abstract transformRecord(AirtableRecord: AirtableRecord): T;

  convertToRaw(airtableRecord: AirtableRecord) {
    try {
      return this.schema.fields.reduce(
        (rawObject, { source, transform }) => {
          rawObject[transform] = airtableRecord.get(source) || null;
          return rawObject;
        },
        { id: airtableRecord.id }
      );
    } catch (_) {
      return airtableRecord;
    }
  }
}
