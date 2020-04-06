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
    if (baseId) {
      this.base = new Airtable().base(baseId);
    } else {
      throw new Error('AirtableFramework: baseId should be valid');
    }
  }
  /* –– Public API
   * –––––––––––––––––––––––––––––––– */
  getAll(tableName: string) {
    this.checkTableName(tableName);

    return (this.base(tableName)
      .select()
      .all() as unknown) as Promise<AirtableRecord[]>;
  }

  get(tableName: string, id: string) {
    this.checkTableName(tableName);
    return (this.base(tableName).find(id) as unknown) as Promise<AirtableRecord>;
  }

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––– */
  checkTableName(tableName: string) {
    if (!tableName) {
      throw new Error('AirtableFramework: tableName should be valid');
    }
  }
}
