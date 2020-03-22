/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import Airtable from 'airtable';

// App imports
import { AirtableApi, AirtableRecord } from '@masterboard/adapters';

/* ––
 * –––– Framework definition
 * –––––––––––––––––––––––––––––––– */
export class AirtableFramework implements AirtableApi {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  base: Airtable.Base;
  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(baseId: string) {
    this.base = new Airtable().base(baseId);
  }
  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  getAll(tableName: string) {
    return (this.base(tableName)
      .select()
      .all() as unknown) as Promise<AirtableRecord[]>;
  }

  get(tableName: string, id: string) {
    return (this.base(tableName).find(id) as unknown) as Promise<AirtableRecord>;
  }
}
