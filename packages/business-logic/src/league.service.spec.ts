/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { LeagueService } from './league.service';
import { League } from '@masterboard/entities';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
const storeAdapterMock = jest.fn(() => ({
  getAll: jest.fn().mockReturnValue([new League()]),
  get: jest.fn().mockReturnValue(new League()),
}));

// Variables
let leagueService: LeagueService;
let storeAdapterInstance;

// Hooks
beforeEach(() => {
  storeAdapterMock.mockClear();
  storeAdapterInstance = new storeAdapterMock();
  leagueService = new LeagueService(storeAdapterInstance);
});

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('LeagueService', () => {
  test('shoud be instantiated with no errors', () => {
    expect(() => new LeagueService(storeAdapterInstance)).not.toThrowError();
  });

  test('should contain a method for retrieving a list of leagues', () => {
    expect(leagueService).toHaveProperty('getLeagues');
    expect(leagueService.getLeagues).toBeInstanceOf(Function);
  });

  test('should contain a method for retrieving a specific league', () => {
    expect(leagueService).toHaveProperty('getLeague');
    expect(leagueService.getLeague).toBeInstanceOf(Function);
  });

  test('should return a list of leagues when requested', async () => {
    const leagues = await leagueService.getLeagues();

    expect(leagues).toBeDefined();
    expect(leagues).toBeInstanceOf(Array);
    expect(leagues[0]).toBeInstanceOf(League);
  });

  test('should return a league object when requested', async () => {
    const league = await leagueService.getLeague('leagueId');

    expect(league).toBeDefined();
    expect(league).toBeInstanceOf(League);
  });

  test('should return league object related to leagueId', async () => {
    const leagueId = 'leagueId';
    storeAdapterInstance.get.mockReturnValue(new League({ id: leagueId }));

    const league = await leagueService.getLeague(leagueId);

    expect(league.id).toBe(leagueId);
  });

  test('should call store adapter for retrieving all leagues', () => {
    expect(storeAdapterInstance.getAll).not.toHaveBeenCalled();

    leagueService.getLeagues();

    expect(storeAdapterInstance.getAll).toHaveBeenCalled();
  });

  test('should call store adapter for retrieving a specific league', () => {
    expect(storeAdapterInstance.get).not.toHaveBeenCalled();

    const leagueId = '123456';
    leagueService.getLeague(leagueId);

    expect(storeAdapterInstance.get).toHaveBeenCalled();
    expect(storeAdapterInstance.get).toHaveBeenCalledWith(leagueId);
  });
});
