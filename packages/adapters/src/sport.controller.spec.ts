/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportService } from '@masterboard/business-logic';
import { SportController } from './sport.controller';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
jest.mock('@masterboard/business-logic');
jest.mock('./airtable-sport.adapter');
const airtableApiMock = { get: () => null, getAll: () => null };

// Variables
let sportServiceMock: jest.Mock;

// Hooks
beforeAll(() => (sportServiceMock = (SportService as unknown) as jest.Mock));
beforeEach(() => sportServiceMock.mockClear());

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('SportController', () => {
  test('should instantiate sport service', () => {
    let sportController: SportController;
    expect(() => (sportController = new SportController(airtableApiMock))).not.toThrowError();
    expect(sportController.sportService).toBeDefined();
  });

  test('should request sports data', () => {
    const sportController = new SportController(airtableApiMock);
    const sports = [1, 2, 3];
    const sportServiceInstance: { getSports: jest.Mock } = sportServiceMock.mock.instances[0];
    sportServiceInstance.getSports.mockReturnValue(Promise.resolve(sports));

    const result = sportController.getSports();

    expect(sportServiceInstance.getSports).toHaveBeenCalledTimes(1);
    expect(result).resolves.toBe(sports);
  });

  test('should return null when sports request failed', () => {
    const sportController = new SportController(airtableApiMock);
    const sportServiceInstance: { getSports: jest.Mock } = sportServiceMock.mock.instances[0];
    sportServiceInstance.getSports.mockReturnValue(Promise.reject('Request error'));

    const result = sportController.getSports();

    expect(sportServiceInstance.getSports).toHaveBeenCalledTimes(1);
    expect(result).resolves.toBeNull();
  });

  test('should request specific sport data', () => {
    const sportController = new SportController(airtableApiMock);
    const sportId = 'sportId';
    const sport = { id: sportId, name: '5v5' };

    const sportServiceInstance: { getSport: jest.Mock } = sportServiceMock.mock.instances[0];
    sportServiceInstance.getSport.mockReturnValue(Promise.resolve(sport));

    const result = sportController.getSport(sportId);

    expect(sportServiceInstance.getSport).toHaveBeenCalledTimes(1);
    expect(sportServiceInstance.getSport).toHaveBeenCalledWith(sportId);
    expect(result).resolves.toBe(sport);
  });

  test('should return null if no valid id is passed in', () => {
    const sportController = new SportController(airtableApiMock);

    const result = sportController.getSport('');
    const result2 = sportController.getSport(undefined);
    const result3 = sportController.getSport(null);

    expect(result).resolves.toBeNull();
    expect(result2).resolves.toBeNull();
    expect(result3).resolves.toBeNull();
  });

  test('should return null when sport request failed', () => {
    const sportController = new SportController(airtableApiMock);
    const sportServiceInstance: { getSport: jest.Mock } = sportServiceMock.mock.instances[0];
    sportServiceInstance.getSport.mockReturnValue(Promise.reject('League request failed'));

    const result = sportController.getSport('sportId');

    expect(sportServiceInstance.getSport).toHaveBeenCalledTimes(1);
    expect(result).resolves.toBeNull();
  });
});
