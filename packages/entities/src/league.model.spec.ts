/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { League } from './league.model';

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('League', () => {
  test('should instantiate with no errors', () => {
    expect(() => new League()).not.toThrowError();
  });

  test('should assign default values if no raw object is passed in', () => {
    const league = new League();

    expect(league.id).toBeNull();
    expect(league.name).toBe('');
    expect(league.code).toBe('');
    expect(league.members).toBeInstanceOf(Array);
    expect(league.members.length).toBe(0);
  });

  test('should assign default values if partial data is passed in', () => {
    let rawData = {};
    let league = new League(rawData);

    expect(league.id).toBeNull();
    expect(league.name).toBe('');
    expect(league.code).toBe('');
    expect(league.members).toBeInstanceOf(Array);
    expect(league.members.length).toBe(0);

    rawData = { id: '1', name: 'Hello' };
    league = new League(rawData);

    expect(league.id).not.toBeNull();
    expect(league.name).not.toBe('');
    expect(league.code).toBe('');
    expect(league.members).toBeInstanceOf(Array);
    expect(league.members.length).toBe(0);

    rawData = { members: ['Gilberto'], code: 'GTDH343' };
    league = new League(rawData);

    expect(league.id).toBeNull();
    expect(league.name).toBe('');
    expect(league.code).not.toBe('');
    expect(league.members).not.toBe([]);
  });

  test('should assign values with passed in data', () => {
    let rawData = { id: '1', name: 'My league', members: ['Gilberto'], code: 'GIL123' };
    let league = new League(rawData);

    expect(league.id).toBe(rawData.id);
    expect(league.name).toBe(rawData.name);
    expect(league.code).toBe(rawData.code);
    expect(league.members).toBe(rawData.members);

    rawData = { id: '2', name: 'My second league', members: ['Damaris', 'Cindy'], code: 'FAM123' };
    league = new League(rawData);

    expect(league.id).toBe(rawData.id);
    expect(league.name).toBe(rawData.name);
    expect(league.code).toBe(rawData.code);
    expect(league.members).toBe(rawData.members);
  });
});
