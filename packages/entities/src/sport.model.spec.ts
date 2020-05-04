/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { Sport } from './sport.model';
import { SportFormat } from './sport-format.model';

/* ––
 * –––– Tests arrangement
 * –––––––––––––––––––––––––––––––– */
// Mocks
jest.mock('./sport-format.model');

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('Sport', () => {
  test('should instantiate with no errors', () => {
    expect(() => new Sport()).not.toThrowError();
  });

  test('should assign default values if no raw object is passed in', () => {
    const sport = new Sport();

    expect(sport.id).toBeNull();
    expect(sport.name).toBe('');
    expect(sport.formats).toBeInstanceOf(Array);
    expect(sport.formats.length).toBe(0);
  });

  test('should assign default values if partial data is passed in', () => {
    let rawData = {};
    let sport = new Sport(rawData);

    expect(sport.id).toBeNull();
    expect(sport.name).toBe('');
    expect(sport.formats).toBeInstanceOf(Array);
    expect(sport.formats.length).toBe(0);

    rawData = { id: '1', name: 'Hello' };
    sport = new Sport(rawData);

    expect(sport.id).not.toBeNull();
    expect(sport.name).not.toBe('');
    expect(sport.formats).toBeInstanceOf(Array);
    expect(sport.formats.length).toBe(0);

    rawData = { formats: [{}] };
    sport = new Sport(rawData);

    expect(sport.id).toBeNull();
    expect(sport.name).toBe('');
    expect(sport.formats).toBeInstanceOf(Array);
    expect(sport.formats).not.toBe([]);
  });

  test('should assign values with passed in data', () => {
    let rawData = { id: '1', name: 'Soccer', formats: [{}] };
    let sport = new Sport(rawData);

    expect(sport.id).toBe(rawData.id);
    expect(sport.name).toBe(rawData.name);
    expect(sport.formats.length).toBe(rawData.formats.length);
    expect(sport.formats[0]).toBeInstanceOf(SportFormat);

    rawData = { id: '2', name: 'Basketball', formats: [{}, {}, {}] };
    sport = new Sport(rawData);

    expect(sport.id).toBe(rawData.id);
    expect(sport.name).toBe(rawData.name);
    expect(sport.formats.length).toBe(rawData.formats.length);
    expect(sport.formats[1]).toBeInstanceOf(SportFormat);
    expect(sport.formats[2]).toBeInstanceOf(SportFormat);
  });

  test('should set no formats if raw data formats value is not an array', () => {
    let rawData = { formats: { id: 'myFormat' } };
    let sport = new Sport(rawData);

    expect(sport.formats).toBeInstanceOf(Array);
    expect(sport.formats.length).toBe(0);
  });
});
