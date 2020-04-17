/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { AirtableCompetitorAdapter } from './airtable-competitor.adapter';
import { Competitor } from '@masterboard/entities';
import { competitorSchema } from './airtable.schema';
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
  (Competitor as jest.Mock).mockClear();
  airtableApiMethodMock.mockClear();
  airtableApiMock.mockClear();
});

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('AirtableCompetitorAdapter', () => {
  test('should contain a method for retrieving a list of competitors', () => {
    const adapter = new AirtableCompetitorAdapter(new airtableApiMock());

    expect(adapter).toHaveProperty('getAll');
    expect(adapter.getAll).toBeInstanceOf(Function);
  });

  test('should contain a method for retrieving a specific competitor', () => {
    const adapter = new AirtableCompetitorAdapter(new airtableApiMock());

    expect(adapter).toHaveProperty('get');
    expect(adapter.get).toBeInstanceOf(Function);
  });

  test('should use airtable competitor schema for requesting data', async () => {
    const adapter = new AirtableCompetitorAdapter(new airtableApiMock());
    const recordId = 'recordId';
    jest.spyOn(adapter, 'transformRecord').mockImplementation((record) => new Competitor(record));

    airtableApiMethodMock.mockReturnValue(Promise.resolve([]));
    adapter.getAll();

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(1);
    expect(airtableApiMethodMock).toHaveBeenCalledWith(competitorSchema.tableName);

    airtableApiMethodMock.mockReturnValue(Promise.resolve({}));
    await adapter.get(recordId);

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(2);
    expect(airtableApiMethodMock).toHaveBeenCalledWith(competitorSchema.tableName, recordId);
  });

  test('should create a Competitor object based on raw value', () => {
    const adapter = new AirtableCompetitorAdapter(new airtableApiMock());
    const convertToRawSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation((record) => record);

    const competitor = adapter.transformRecord({} as AirtableRecord);

    expect(competitor).toBeInstanceOf(Competitor);
    expect(convertToRawSpy).toHaveBeenCalledTimes(1);
    expect(Competitor).toHaveBeenCalledTimes(1);
  });
});
