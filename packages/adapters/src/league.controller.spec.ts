/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { LeagueService } from '@masterboard/business-logic';
import { LeagueController } from './league.controller';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
jest.mock('@masterboard/business-logic');
jest.mock('./airtable-league.adapter');
const airtableApiMock = { get: () => null, getAll: () => null };

// Variables
let leagueServiceMock: jest.Mock;

// Hooks
beforeAll(() => (leagueServiceMock = (LeagueService as unknown) as jest.Mock));
beforeEach(() => leagueServiceMock.mockClear());

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('LeagueController', () => {
  test('should instantiate league service', () => {
    let leagueController: LeagueController;
    expect(() => (leagueController = new LeagueController(airtableApiMock))).not.toThrowError();
    expect(leagueController.leagueService).toBeDefined();
  });

  test('should request leagues data', () => {
    const leagueController = new LeagueController(airtableApiMock);
    const leagues = [1, 2, 3];
    const leagueServiceInstance: { getLeagues: jest.Mock } = leagueServiceMock.mock.instances[0];
    leagueServiceInstance.getLeagues.mockReturnValue(Promise.resolve(leagues));

    const result = leagueController.getLeagues();

    expect(leagueServiceInstance.getLeagues).toHaveBeenCalledTimes(1);
    expect(result).resolves.toBe(leagues);
  });

  test('should return null when leagues request failed', () => {
    const leagueController = new LeagueController(airtableApiMock);
    const leagueServiceInstance: { getLeagues: jest.Mock } = leagueServiceMock.mock.instances[0];
    leagueServiceInstance.getLeagues.mockReturnValue(Promise.reject('Request error'));

    const result = leagueController.getLeagues();

    expect(leagueServiceInstance.getLeagues).toHaveBeenCalledTimes(1);
    expect(result).resolves.toBeNull();
  });

  test('should request specific league data', () => {
    const leagueController = new LeagueController(airtableApiMock);
    const leagueId = 'leagueId';
    const league = { id: leagueId, name: 'League' };

    const leagueServiceInstance: { getLeague: jest.Mock } = leagueServiceMock.mock.instances[0];
    leagueServiceInstance.getLeague.mockReturnValue(Promise.resolve(league));

    const result = leagueController.getLeague(leagueId);

    expect(leagueServiceInstance.getLeague).toHaveBeenCalledTimes(1);
    expect(leagueServiceInstance.getLeague).toHaveBeenCalledWith(leagueId);
    expect(result).resolves.toBe(league);
  });

  test('should return null if no valid id is passed in', () => {
    const leagueController = new LeagueController(airtableApiMock);

    const result = leagueController.getLeague('');
    const result2 = leagueController.getLeague(undefined);
    const result3 = leagueController.getLeague(null);

    expect(result).resolves.toBeNull();
    expect(result2).resolves.toBeNull();
    expect(result3).resolves.toBeNull();
  });

  test('should return null when league request failed', () => {
    const leagueController = new LeagueController(airtableApiMock);
    const leagueServiceInstance: { getLeague: jest.Mock } = leagueServiceMock.mock.instances[0];
    leagueServiceInstance.getLeague.mockReturnValue(Promise.reject('League request failed'));

    const result = leagueController.getLeague('leagueId');

    expect(leagueServiceInstance.getLeague).toHaveBeenCalledTimes(1);
    expect(result).resolves.toBeNull();
  });
});
