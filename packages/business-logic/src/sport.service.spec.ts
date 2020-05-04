/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportService } from './sport.service';
import { Sport } from '@masterboard/entities';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
const storeAdapterMock = jest.fn(() => ({
  getAll: jest.fn().mockReturnValue([new Sport()]),
  get: jest.fn().mockReturnValue(new Sport()),
}));

// Variables
let sportService: SportService;
let storeAdapterInstance;

// Hooks
beforeEach(() => {
  storeAdapterMock.mockClear();
  storeAdapterInstance = new storeAdapterMock();
  sportService = new SportService(storeAdapterInstance);
});

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('SportService', () => {
  test('shoud be instantiated with no errors', () => {
    expect(() => new SportService(storeAdapterInstance)).not.toThrowError();
  });

  test('should contain a method for retrieving a list of sports', () => {
    expect(sportService).toHaveProperty('getSports');
    expect(sportService.getSports).toBeInstanceOf(Function);
  });

  test('should contain a method for retrieving a specific sport', () => {
    expect(sportService).toHaveProperty('getSport');
    expect(sportService.getSport).toBeInstanceOf(Function);
  });

  test('should return a list of sports when requested', async () => {
    const sports = await sportService.getSports();

    expect(sports).toBeDefined();
    expect(sports).toBeInstanceOf(Array);
    expect(sports[0]).toBeInstanceOf(Sport);
  });

  test('should return a sport object when requested', async () => {
    const sport = await sportService.getSport('sportId');

    expect(sport).toBeDefined();
    expect(sport).toBeInstanceOf(Sport);
  });

  test('should return sport object related to sportId', async () => {
    const sportId = 'sportId';
    storeAdapterInstance.get.mockReturnValue(new Sport({ id: sportId }));

    const sport = await sportService.getSport(sportId);

    expect(sport.id).toBe(sportId);
  });

  test('should call store adapter for retrieving all sports', () => {
    expect(storeAdapterInstance.getAll).not.toHaveBeenCalled();

    sportService.getSports();

    expect(storeAdapterInstance.getAll).toHaveBeenCalled();
  });

  test('should call store adapter for retrieving a specific sport', () => {
    expect(storeAdapterInstance.get).not.toHaveBeenCalled();

    const sportId = '123456';
    sportService.getSport(sportId);

    expect(storeAdapterInstance.get).toHaveBeenCalled();
    expect(storeAdapterInstance.get).toHaveBeenCalledWith(sportId);
  });
});
