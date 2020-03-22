/* ––
 * –––– Interface definition
 * –––––––––––––––––––––––––––––––– */
export interface AirtableRecord {
  id: string;
  get(fieldName: string): any;
}

export interface AirtableApi {
  getAll(tableName: string): Promise<AirtableRecord[]>;
  get(tableName: string, id: string): Promise<AirtableRecord>;
}
