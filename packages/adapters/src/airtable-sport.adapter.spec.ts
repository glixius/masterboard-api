/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { AirtableSportAdapter } from './airtable-sport.adapter';
import { Sport } from '@masterboard/entities';
import { sportsSchema } from './airtable.schema';
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
  (Sport as jest.Mock).mockClear();
  airtableApiMethodMock.mockClear();
  airtableApiMock.mockClear();
});

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('AirtableSportAdapter', () => {
  test('should contain a method for retrieving a list of sports', () => {
    const adapter = new AirtableSportAdapter(new airtableApiMock());

    expect(adapter).toHaveProperty('getAll');
    expect(adapter.getAll).toBeInstanceOf(Function);
  });

  test('should contain a method for retrieving a specific sport', () => {
    const adapter = new AirtableSportAdapter(new airtableApiMock());

    expect(adapter).toHaveProperty('get');
    expect(adapter.get).toBeInstanceOf(Function);
  });

  test('should use airtable sport schema for requesting data', async () => {
    const adapter = new AirtableSportAdapter(new airtableApiMock());
    const recordId = 'recordId';
    jest.spyOn(adapter, 'transformRecord').mockImplementation((record) => new Sport(record));

    airtableApiMethodMock.mockReturnValue(Promise.resolve([]));
    adapter.getAll();

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(1);
    expect(airtableApiMethodMock).toHaveBeenCalledWith(sportsSchema.tableName);

    airtableApiMethodMock.mockReturnValue(Promise.resolve({}));
    await adapter.get(recordId);

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(2);
    expect(airtableApiMethodMock).toHaveBeenCalledWith(sportsSchema.tableName, recordId);
  });

  test('should create a Sport object based on raw value', () => {
    const adapter = new AirtableSportAdapter(new airtableApiMock());
    const convertToRawSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation((record) => record);

    const sport = adapter.transformRecord({} as AirtableRecord);

    expect(sport).toBeInstanceOf(Sport);
    expect(convertToRawSpy).toHaveBeenCalledTimes(1);
    expect(Sport).toHaveBeenCalledTimes(1);
  });

  test('should convert sport format ids into objects', () => {
    const adapter = new AirtableSportAdapter(new airtableApiMock());
    const convertToRawSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation((record) => record);

    const sport = adapter.transformRecord({
      id: '1',
      name: 'Sport name',
      formats: ['sportFormat1', 'sportFormat2'],
      get() {},
    } as AirtableRecord);

    expect(sport).toBeInstanceOf(Sport);
    expect(convertToRawSpy).toHaveBeenCalledTimes(1);
    expect(Sport).toHaveBeenCalledTimes(1);

    const [formattedRecord] = (Sport as jest.Mock).mock.calls[0];

    expect(formattedRecord.formats.length).toBe(2);
    expect(formattedRecord.formats[0].id).toBeTruthy();
    expect(formattedRecord.formats[0].id).toBe('sportFormat1');
    expect(formattedRecord.formats[1].id).toBeTruthy();
    expect(formattedRecord.formats[1].id).toBe('sportFormat2');
  });

  test('should default to empty array when no sport formats id is given', () => {
    const adapter = new AirtableSportAdapter(new airtableApiMock());
    const convertToRawSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation((record) => record);

    const sport = adapter.transformRecord({
      id: '1',
      name: 'Sport name',
      formats: 'another sport format',
      get() {},
    } as AirtableRecord);

    expect(sport).toBeInstanceOf(Sport);
    expect(convertToRawSpy).toHaveBeenCalledTimes(1);
    expect(Sport).toHaveBeenCalledTimes(1);

    const [formattedRecord] = (Sport as jest.Mock).mock.calls[0];

    expect(formattedRecord.formats).toBeInstanceOf(Array);
    expect(formattedRecord.formats.length).toBe(0);

    const sport2 = adapter.transformRecord({
      id: '1',
      name: 'Sport name',
      formats: { id: 'sportFormat1' },
      get() {},
    } as AirtableRecord);

    expect(sport2).toBeInstanceOf(Sport);
    expect(convertToRawSpy).toHaveBeenCalledTimes(2);
    expect(Sport).toHaveBeenCalledTimes(2);

    const [formattedRecord2] = (Sport as jest.Mock).mock.calls[1];

    expect(formattedRecord2.formats).toBeInstanceOf(Array);
    expect(formattedRecord2.formats.length).toBe(0);
  });
});
