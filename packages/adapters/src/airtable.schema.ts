/* ––
 * –––– Interface declaraton
 * –––––––––––––––––––––––––––––––– */
export interface AirtableRecordSchema {
  tableName: string;
  fields: { source: string; transform: string }[];
}

/* ––
 * –––– Schemas definition
 * –––––––––––––––––––––––––––––––– */
export const leagueSchema: AirtableRecordSchema = {
  tableName: 'Leagues',
  fields: [
    { source: 'Name', transform: 'name' },
    { source: 'Members', transform: 'members' },
    { source: 'Code', transform: 'code' },
  ],
};
