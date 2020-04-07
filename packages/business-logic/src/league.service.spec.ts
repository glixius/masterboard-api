/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { LeagueService } from './league.service';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
const storeAdapterMock = jest.fn(() => ({ getAll: jest.fn(), get: jest.fn() }));

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
  test('should call store adapter for retrieving all leagues', () => {
    expect(storeAdapterInstance.getAll).not.toHaveBeenCalled();

    leagueService.getLeagues();

    expect(storeAdapterInstance.getAll).toHaveBeenCalled();
  });

  test('should call store adapter for retrieving an specific league', () => {
    expect(storeAdapterInstance.get).not.toHaveBeenCalled();

    const leagueId = '123456';
    leagueService.getLeague(leagueId);

    expect(storeAdapterInstance.get).toHaveBeenCalled();
    expect(storeAdapterInstance.get).toHaveBeenCalledWith(leagueId);
  });
});
