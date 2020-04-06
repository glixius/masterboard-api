/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
//  Third-party imports
import Airtable from 'airtable';

// App imports
import { AirtableFramework } from './airtable.framework';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Create required mocks
const baseMethodMock = jest.fn().mockReturnValue('Airtable result');
const selectMethodMock = jest.fn().mockReturnValue({ all: baseMethodMock });
const baseMock = jest.fn(() => ({ select: selectMethodMock, find: baseMethodMock }));
const createBaseMock = jest.fn(() => baseMock);

// Mock module
jest.mock('airtable', () => jest.fn(() => ({ base: createBaseMock })));

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('AirtableFramework', () => {
  let mockedAirtable: jest.Mock;

  beforeEach(() => {
    mockedAirtable = (Airtable as unknown) as jest.Mock;
    mockedAirtable.mockClear();
    createBaseMock.mockClear();
    baseMock.mockClear();
    baseMethodMock.mockClear();
    selectMethodMock.mockClear();
  });

  test('should failed if empty base id is received', () => {
    const errorDescription = 'AirtableFramework: baseId should be valid';

    expect(() => new AirtableFramework('')).toThrow(errorDescription);
    expect(() => new AirtableFramework(undefined)).toThrow(errorDescription);
    expect(() => new AirtableFramework(null)).toThrow(errorDescription);
  });

  test('should build an airtable base object', () => {
    const baseId = 'MyBaseId';
    let framework = new AirtableFramework(baseId);

    expect(mockedAirtable).toHaveBeenCalledTimes(1);
    expect(createBaseMock).toHaveBeenCalledTimes(1);
    expect(createBaseMock).toHaveBeenCalledWith(baseId);
  });

  test('should failed methods if no table name is given', () => {
    let framework = new AirtableFramework('baseId');

    expect(baseMock).not.toHaveBeenCalled();
    expect(baseMethodMock).not.toHaveBeenCalled();

    expect(() => framework.getAll('')).toThrow('AirtableFramework: tableName should be valid');
    expect(() => framework.get('', '')).toThrow('AirtableFramework: tableName should be valid');
  });

  test('should request all records for given table', () => {
    const tableName = 'tableName';
    let framework = new AirtableFramework('baseId');

    expect(baseMock).not.toHaveBeenCalled();
    expect(baseMethodMock).not.toHaveBeenCalled();

    const result = framework.getAll(tableName);

    expect(baseMock).toHaveBeenCalledTimes(1);
    expect(baseMock).toHaveBeenCalledWith(tableName);
    expect(selectMethodMock).toHaveBeenCalledTimes(1);
    expect(selectMethodMock).toHaveBeenCalledWith();
    expect(baseMethodMock).toHaveBeenCalledTimes(1);
    expect(result).toBe('Airtable result');
  });

  test('should request a particular record for given table', () => {
    const tableName = 'tableName';
    const recordId = 'recordId';
    let framework = new AirtableFramework('baseId');

    expect(baseMock).not.toHaveBeenCalled();
    expect(baseMethodMock).not.toHaveBeenCalled();

    const result = framework.get(tableName, recordId);

    expect(baseMock).toHaveBeenCalledTimes(1);
    expect(baseMock).toHaveBeenCalledWith(tableName);
    expect(selectMethodMock).not.toHaveBeenCalled();
    expect(baseMethodMock).toHaveBeenCalledTimes(1);
    expect(baseMethodMock).toHaveBeenCalledWith(recordId);
    expect(result).toBe('Airtable result');
  });
});
