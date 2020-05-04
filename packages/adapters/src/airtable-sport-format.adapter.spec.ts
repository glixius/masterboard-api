/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { AirtableSportFormatAdapter } from './airtable-sport-format.adapter';
import { SportFormat } from '@masterboard/entities';
import { sportFormatsSchema } from './airtable.schema';
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
  (SportFormat as jest.Mock).mockClear();
  airtableApiMethodMock.mockClear();
  airtableApiMock.mockClear();
});

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('AirtableSportFormatAdapter', () => {
  test('should contain a method for retrieving a list of sport formats', () => {
    const adapter = new AirtableSportFormatAdapter(new airtableApiMock());

    expect(adapter).toHaveProperty('getAll');
    expect(adapter.getAll).toBeInstanceOf(Function);
  });

  test('should contain a method for retrieving a specific sport format', () => {
    const adapter = new AirtableSportFormatAdapter(new airtableApiMock());

    expect(adapter).toHaveProperty('get');
    expect(adapter.get).toBeInstanceOf(Function);
  });

  test('should use airtable sport format schema for requesting data', async () => {
    const adapter = new AirtableSportFormatAdapter(new airtableApiMock());
    const recordId = 'recordId';
    jest.spyOn(adapter, 'transformRecord').mockImplementation((record) => new SportFormat(record));

    airtableApiMethodMock.mockReturnValue(Promise.resolve([]));
    adapter.getAll();

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(1);
    expect(airtableApiMethodMock).toHaveBeenCalledWith(sportFormatsSchema.tableName);

    airtableApiMethodMock.mockReturnValue(Promise.resolve({}));
    await adapter.get(recordId);

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(2);
    expect(airtableApiMethodMock).toHaveBeenCalledWith(sportFormatsSchema.tableName, recordId);
  });

  test('should create a SportFormat object based on raw value', () => {
    const adapter = new AirtableSportFormatAdapter(new airtableApiMock());
    const convertToRawSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation((record) => record);

    const sportFormat = adapter.transformRecord({} as AirtableRecord);

    expect(sportFormat).toBeInstanceOf(SportFormat);
    expect(convertToRawSpy).toHaveBeenCalledTimes(1);
    expect(SportFormat).toHaveBeenCalledTimes(1);
  });
});
