/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { CompetitorService } from './competitor.service';
import { Competitor } from '@masterboard/entities';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
const storeAdapterMock = jest.fn(() => ({
  getAll: jest.fn().mockReturnValue([new Competitor()]),
  get: jest.fn().mockReturnValue(new Competitor()),
}));

// Variables
let competitorService: CompetitorService;
let storeAdapterInstance;

// Hooks
beforeEach(() => {
  storeAdapterMock.mockClear();
  storeAdapterInstance = new storeAdapterMock();
  competitorService = new CompetitorService(storeAdapterInstance);
});

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('CompetitorService', () => {
  test('shoud be instantiated with no errors', () => {
    expect(() => new CompetitorService(storeAdapterInstance)).not.toThrowError();
  });

  test('should contain a method for retrieving a list of competitors', () => {
    expect(competitorService).toHaveProperty('getCompetitors');
    expect(competitorService.getCompetitors).toBeInstanceOf(Function);
  });

  test('should contain a method for retrieving a specific competitor', () => {
    expect(competitorService).toHaveProperty('getCompetitor');
    expect(competitorService.getCompetitor).toBeInstanceOf(Function);
  });

  test('should return a list of competitors when requested', async () => {
    const competitors = await competitorService.getCompetitors();

    expect(competitors).toBeDefined();
    expect(competitors).toBeInstanceOf(Array);
    expect(competitors[0]).toBeInstanceOf(Competitor);
  });

  test('should return a competitor object when requested', async () => {
    const competitor = await competitorService.getCompetitor('competitorId');

    expect(competitor).toBeDefined();
    expect(competitor).toBeInstanceOf(Competitor);
  });

  test('should return competitor object related to competitorId', async () => {
    const competitorId = 'competitorId';
    storeAdapterInstance.get.mockReturnValue(new Competitor({ id: competitorId }));

    const competitor = await competitorService.getCompetitor(competitorId);

    expect(competitor.id).toBe(competitorId);
  });

  test('should call store adapter for retrieving all competitors', () => {
    expect(storeAdapterInstance.getAll).not.toHaveBeenCalled();

    competitorService.getCompetitors();

    expect(storeAdapterInstance.getAll).toHaveBeenCalled();
  });

  test('should call store adapter for retrieving a specific competitor', () => {
    expect(storeAdapterInstance.get).not.toHaveBeenCalled();

    const competitorId = 'competitorId';
    competitorService.getCompetitor(competitorId);

    expect(storeAdapterInstance.get).toHaveBeenCalled();
    expect(storeAdapterInstance.get).toHaveBeenCalledWith(competitorId);
  });
});
