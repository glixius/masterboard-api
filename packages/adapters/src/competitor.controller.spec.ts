/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { CompetitorController } from './competitor.controller';
import { CompetitorService } from '@masterboard/business-logic';
import { Competitor } from '@masterboard/entities';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
jest.mock('@masterboard/business-logic');
jest.mock('./airtable-league.adapter');
const airtableApiMock = { get: () => null, getAll: () => null };

// Variables
let competitorServiceMock: jest.Mock;

// Hooks
beforeAll(() => (competitorServiceMock = (CompetitorService as unknown) as jest.Mock));
beforeEach(() => competitorServiceMock.mockClear());

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('CompetitorController', () => {
  test('should be instantiated wth no errors', () => {
    expect(() => new CompetitorController(airtableApiMock)).not.toThrowError();
  });

  test('should contain a method for retrieving a list of competitors', () => {
    const competitorController = new CompetitorController(airtableApiMock);

    expect(competitorController).toHaveProperty('getCompetitors');
    expect(competitorController.getCompetitors).toBeInstanceOf(Function);
  });

  test('should contain a method for retrieving a specific competitor', () => {
    const competitorController = new CompetitorController(airtableApiMock);

    expect(competitorController).toHaveProperty('getCompetitor');
    expect(competitorController.getCompetitor).toBeInstanceOf(Function);
  });

  test('should request competitors data', async () => {
    const competitorController = new CompetitorController(airtableApiMock);
    const competitors = [new Competitor(), new Competitor(), new Competitor()];
    const competitorServiceInstance: { getCompetitors: jest.Mock } =
      competitorServiceMock.mock.instances[0];
    competitorServiceInstance.getCompetitors.mockReturnValue(Promise.resolve(competitors));

    const result = await competitorController.getCompetitors();

    expect(competitorServiceInstance.getCompetitors).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result).toBe(competitors);
    expect(result[0]).toBeInstanceOf(Competitor);
  });

  test('should return null when competitors request failed', async () => {
    const competitorController = new CompetitorController(airtableApiMock);
    const competitorServiceInstance: { getCompetitors: jest.Mock } =
      competitorServiceMock.mock.instances[0];
    competitorServiceInstance.getCompetitors.mockReturnValue(Promise.reject('Competitors failed'));

    const result = await competitorController.getCompetitors();

    expect(competitorServiceInstance.getCompetitors).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

  test('should request specific competitor data', async () => {
    const competitorController = new CompetitorController(airtableApiMock);
    const competitorId = 'competitorId';
    const competitor = new Competitor({ id: competitorId });
    const competitorServiceInstance: { getCompetitor: jest.Mock } =
      competitorServiceMock.mock.instances[0];
    competitorServiceInstance.getCompetitor.mockReturnValue(Promise.resolve(competitor));

    const result = await competitorController.getCompetitor(competitorId);

    expect(competitorServiceInstance.getCompetitor).toHaveBeenCalledTimes(1);
    expect(competitorServiceInstance.getCompetitor).toHaveBeenCalledWith(competitorId);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Competitor);
    expect(result).toBe(competitor);
  });

  test('should return null if no valid id is passed in', async () => {
    const competitorController = new CompetitorController(airtableApiMock);

    const result = await competitorController.getCompetitor('');
    const result2 = await competitorController.getCompetitor(undefined);
    const result3 = await competitorController.getCompetitor(null);

    expect(result).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
  });

  test('should return null when league request failed', async () => {
    const competitorController = new CompetitorController(airtableApiMock);
    const competitorServiceInstance: { getCompetitor: jest.Mock } =
      competitorServiceMock.mock.instances[0];
    competitorServiceInstance.getCompetitor.mockReturnValue(Promise.reject('Competitor error'));

    const result = await competitorController.getCompetitor('competitorId');

    expect(competitorServiceInstance.getCompetitor).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });
});
