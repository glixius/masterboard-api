/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportFormatService } from '@masterboard/business-logic';
import { SportFormatController } from './sport-format.controller';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
jest.mock('@masterboard/business-logic');
jest.mock('./airtable-sport-format.adapter');
const airtableApiMock = { get: () => null, getAll: () => null };

// Variables
let sportFormatServiceMock: jest.Mock;

// Hooks
beforeAll(() => (sportFormatServiceMock = (SportFormatService as unknown) as jest.Mock));
beforeEach(() => sportFormatServiceMock.mockClear());

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('SportFormatController', () => {
  test('should instantiate sport format service', () => {
    let sportFormatController: SportFormatController;
    expect(
      () => (sportFormatController = new SportFormatController(airtableApiMock))
    ).not.toThrowError();
    expect(sportFormatController.sportFormatService).toBeDefined();
  });

  test('should request sport formats data', () => {
    const sportFormatController = new SportFormatController(airtableApiMock);
    const sportFormats = [1, 2, 3];
    const sportFormatServiceInstance: { getSportFormats: jest.Mock } =
      sportFormatServiceMock.mock.instances[0];
    sportFormatServiceInstance.getSportFormats.mockReturnValue(Promise.resolve(sportFormats));

    const result = sportFormatController.getSportFormats();

    expect(sportFormatServiceInstance.getSportFormats).toHaveBeenCalledTimes(1);
    expect(result).resolves.toBe(sportFormats);
  });

  test('should return null when sport formats request failed', () => {
    const sportFormatController = new SportFormatController(airtableApiMock);
    const sportFormatServiceInstance: { getSportFormats: jest.Mock } =
      sportFormatServiceMock.mock.instances[0];
    sportFormatServiceInstance.getSportFormats.mockReturnValue(Promise.reject('Request error'));

    const result = sportFormatController.getSportFormats();

    expect(sportFormatServiceInstance.getSportFormats).toHaveBeenCalledTimes(1);
    expect(result).resolves.toBeNull();
  });

  test('should request specific sport format data', () => {
    const sportFormatController = new SportFormatController(airtableApiMock);
    const sportFormatId = 'sportFormatId';
    const sportFormat = { id: sportFormatId, name: '5v5' };

    const sportFormatServiceInstance: { getSportFormat: jest.Mock } =
      sportFormatServiceMock.mock.instances[0];
    sportFormatServiceInstance.getSportFormat.mockReturnValue(Promise.resolve(sportFormat));

    const result = sportFormatController.getSportFormat(sportFormatId);

    expect(sportFormatServiceInstance.getSportFormat).toHaveBeenCalledTimes(1);
    expect(sportFormatServiceInstance.getSportFormat).toHaveBeenCalledWith(sportFormatId);
    expect(result).resolves.toBe(sportFormat);
  });

  test('should return null if no valid id is passed in', () => {
    const sportFormatController = new SportFormatController(airtableApiMock);

    const result = sportFormatController.getSportFormat('');
    const result2 = sportFormatController.getSportFormat(undefined);
    const result3 = sportFormatController.getSportFormat(null);

    expect(result).resolves.toBeNull();
    expect(result2).resolves.toBeNull();
    expect(result3).resolves.toBeNull();
  });

  test('should return null when sport format request failed', () => {
    const sportFormatController = new SportFormatController(airtableApiMock);
    const sportFormatServiceInstance: { getSportFormat: jest.Mock } =
      sportFormatServiceMock.mock.instances[0];
    sportFormatServiceInstance.getSportFormat.mockReturnValue(
      Promise.reject('League request failed')
    );

    const result = sportFormatController.getSportFormat('sportFormatId');

    expect(sportFormatServiceInstance.getSportFormat).toHaveBeenCalledTimes(1);
    expect(result).resolves.toBeNull();
  });
});
