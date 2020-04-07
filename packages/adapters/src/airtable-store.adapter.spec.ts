/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { AirtableStoreAdapter } from './airtable-store.adapter';
import { AirtableRecordSchema } from './airtable.schema';
import { AirtableRecord } from './airtable-api.interface';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Interfaces
interface User {
  id: string;
  name: string;
  age: number;
}

// Implementation
class BasicAirtableStoreAdapter extends AirtableStoreAdapter<User> {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  schema: AirtableRecordSchema = {
    tableName: 'Users',
    fields: [
      { source: 'Name', transform: 'name' },
      { source: 'Age', transform: 'age' },
    ],
  };

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––– */
  transformRecord(record: AirtableRecord) {
    return this.convertToRaw(record) as User;
  }
}

// Mocks
const userRecord = {
  id: 'recordId',
  get(fieldName) {
    return this.fields[fieldName];
  },
  fields: { Name: 'Gilberto', Age: 15 },
} as AirtableRecord;
const airtableApiMethodMock = jest.fn();
const airtableApiMock = jest.fn(() => ({
  getAll: airtableApiMethodMock,
  get: airtableApiMethodMock,
}));

// Variables
let adapter: BasicAirtableStoreAdapter;

// Hooks
beforeEach(() => {
  airtableApiMock.mockClear();
  airtableApiMethodMock.mockClear();
  adapter = adapter = new BasicAirtableStoreAdapter(new airtableApiMock());
});

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('AirtableStoreAdapter', () => {
  test('should return records from api framework', async () => {
    const records = [{}, {}, {}];
    const convertToRowSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation(record => record);

    airtableApiMethodMock.mockReturnValue(Promise.resolve(records));

    const result = await adapter.getAll();

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(1);
    expect(convertToRowSpy).toHaveBeenCalledTimes(3);
    expect(result).toContain(records[0]);
    expect(result).toContain(records[1]);
    expect(result).toContain(records[2]);
  });

  test('should throw error when records request failed', async () => {
    const records = [{}, {}, {}];
    const convertToRowSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation(record => record);

    airtableApiMethodMock.mockReturnValue(Promise.reject('Error: My API error'));

    expect(adapter.getAll()).rejects.toThrow('AirtableApiAdapter: Could not retrieve records');

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(1);
    expect(convertToRowSpy).not.toHaveBeenCalled();
  });

  test('should return record from api framework', async () => {
    const recordId = 'recordId';
    const record = { id: recordId };
    const convertToRowSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation(record => record);

    airtableApiMethodMock.mockReturnValue(Promise.resolve(record));

    const result = await adapter.get(recordId);

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(1);
    expect(convertToRowSpy).toHaveBeenCalledTimes(1);
    expect(result).toBe(record);
  });

  test('should throw error when record request failed', async () => {
    const recordId = 'recordId';
    const convertToRowSpy = jest
      .spyOn(adapter, 'convertToRaw')
      .mockImplementation(record => record);

    airtableApiMethodMock.mockReturnValue(Promise.reject('Error: My API error'));

    expect(adapter.get(recordId)).rejects.toThrow(
      'AirtableApiAdapter: Could not retrieve specified record'
    );

    expect(airtableApiMethodMock).toHaveBeenCalledTimes(1);
    expect(convertToRowSpy).not.toHaveBeenCalled();
  });

  test('should throw error if schema is not defined', async () => {
    adapter.schema = undefined;

    expect(adapter.getAll()).rejects.toThrow('AirtableApiAdapter: Could not retrieve records');
    expect(adapter.get('')).rejects.toThrow(
      'AirtableApiAdapter: Could not retrieve specified record'
    );

    expect(airtableApiMethodMock).not.toHaveBeenCalled();
  });

  test('should convert Airtable record to raw object', async () => {
    const rawValue = adapter.convertToRaw(userRecord);

    expect(rawValue).toMatchObject({ id: 'recordId', name: 'Gilberto', age: 15 });
  });

  test('should set null value to missing fields', async () => {
    const rawData = adapter.convertToRaw({ ...userRecord, fields: {} } as AirtableRecord);

    expect(rawData).toMatchObject({ id: 'recordId', name: null, age: null });
  });

  test('should return Airtable record if it does not implement right methods', async () => {
    const record = {} as AirtableRecord;

    const rawData = adapter.convertToRaw(record);
    const nullRawData = adapter.convertToRaw(null);
    const undefinedRawData = adapter.convertToRaw(undefined);

    expect(rawData).toBe(record);
    expect(nullRawData).toBeNull();
    expect(undefinedRawData).not.toBeDefined();
  });

  test('should return Airtable record if no schema is defined', async () => {
    adapter.schema = undefined;

    const rawData = adapter.convertToRaw(userRecord);

    expect(rawData).toBe(userRecord);
  });
});
