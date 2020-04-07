/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { AirtableLeagueAdapter } from './airtable-league.adapter';
import { League } from '@masterboard/entities';
import { leagueSchema } from './airtable.schema';
import { AirtableRecord } from './airtable-api.interface';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
jest.mock('@masterboard/entities');
const airtableApiMethodMock = jest.fn();
const airtableApiMock = jest.fn(() => ({
  getAll: airtableApiMethodMock,
  get: airtableApiMethodMock,
}));

// Hooks
beforeEach(() => {
  (League as jest.Mock).mockClear();
  airtableApiMethodMock.mockClear();
  airtableApiMock.mockClear();
});

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('AirtableLeagueAdapter', () => {
  test('should use airtable league schema for requesting data', async () => {
    const adapter = new AirtableLeagueAdapter(new airtableApiMock());
    const recordId = 'recordId';
    jest.spyOn(adapter, 'transformRecord').mockImplementation(record => new League(record));

    airtableApiMethodMock.mockReturnValue(Promise.resolve([]));
    adapter.getAll();

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(1);
    expect(airtableApiMethodMock).toHaveBeenCalledWith(leagueSchema.tableName);

    airtableApiMethodMock.mockReturnValue(Promise.resolve({}));
    await adapter.get(recordId);

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(2);
    expect(airtableApiMethodMock).toHaveBeenCalledWith(leagueSchema.tableName, recordId);
  });

  test('should create a League object based on raw value', () => {
    const adapter = new AirtableLeagueAdapter(new airtableApiMock());
    const convertToRawSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation(record => record);

    const league = adapter.transformRecord({} as AirtableRecord);

    expect(league).toBeInstanceOf(League);
    expect(convertToRawSpy).toHaveBeenCalledTimes(1);
    expect(League).toHaveBeenCalledTimes(1);
  });
});
