/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportFormatService } from './sport-format.service';
import { SportFormat } from '@masterboard/entities';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
const storeAdapterMock = jest.fn(() => ({
  getAll: jest.fn().mockReturnValue([new SportFormat()]),
  get: jest.fn().mockReturnValue(new SportFormat()),
}));

// Variables
let sportFormatService: SportFormatService;
let storeAdapterInstance;

// Hooks
beforeEach(() => {
  storeAdapterMock.mockClear();
  storeAdapterInstance = new storeAdapterMock();
  sportFormatService = new SportFormatService(storeAdapterInstance);
});

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('SportFormatService', () => {
  test('shoud be instantiated with no errors', () => {
    expect(() => new SportFormatService(storeAdapterInstance)).not.toThrowError();
  });

  test('should contain a method for retrieving a list of sport formats', () => {
    expect(sportFormatService).toHaveProperty('getSportFormats');
    expect(sportFormatService.getSportFormats).toBeInstanceOf(Function);
  });

  test('should contain a method for retrieving a specific sport format', () => {
    expect(sportFormatService).toHaveProperty('getSportFormat');
    expect(sportFormatService.getSportFormat).toBeInstanceOf(Function);
  });

  test('should return a list of sport formats when requested', async () => {
    const sportFormats = await sportFormatService.getSportFormats();

    expect(sportFormats).toBeDefined();
    expect(sportFormats).toBeInstanceOf(Array);
    expect(sportFormats[0]).toBeInstanceOf(SportFormat);
  });

  test('should return a sport format object when requested', async () => {
    const sportFormat = await sportFormatService.getSportFormat('sportFormatId');

    expect(sportFormat).toBeDefined();
    expect(sportFormat).toBeInstanceOf(SportFormat);
  });

  test('should return sport format object related to sportFormatId', async () => {
    const sportFormatId = 'sportFormatId';
    storeAdapterInstance.get.mockReturnValue(new SportFormat({ id: sportFormatId }));

    const sportFormat = await sportFormatService.getSportFormat(sportFormatId);

    expect(sportFormat.id).toBe(sportFormatId);
  });

  test('should call store adapter for retrieving all sport formats', () => {
    expect(storeAdapterInstance.getAll).not.toHaveBeenCalled();

    sportFormatService.getSportFormats();

    expect(storeAdapterInstance.getAll).toHaveBeenCalled();
  });

  test('should call store adapter for retrieving a specific sport format', () => {
    expect(storeAdapterInstance.get).not.toHaveBeenCalled();

    const sportFormatId = '123456';
    sportFormatService.getSportFormat(sportFormatId);

    expect(storeAdapterInstance.get).toHaveBeenCalled();
    expect(storeAdapterInstance.get).toHaveBeenCalledWith(sportFormatId);
  });
});
