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

export const competitorSchema: AirtableRecordSchema = {
  tableName: 'Competitors',
  fields: [
    { source: 'Email', transform: 'email' },
    { source: 'Firstname', transform: 'firstname' },
    { source: 'Lastname', transform: 'lastname' },
    { source: 'Nickname', transform: 'nickname' },
    { source: 'Display name', transform: 'displayName' },
    { source: 'Leagues', transform: 'leagues' },
  ],
};

export const sportFormatsSchema: AirtableRecordSchema = {
  tableName: 'Sport Formats',
  fields: [
    { source: 'Name', transform: 'name' },
    { source: 'Sport', transform: 'sport' },
  ],
};

export const sportsSchema: AirtableRecordSchema = {
  tableName: 'Sports',
  fields: [
    { source: 'Name', transform: 'name' },
    { source: 'Sport Formats', transform: 'formats' },
  ],
};
