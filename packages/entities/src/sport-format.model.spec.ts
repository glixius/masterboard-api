/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportFormat } from './sport-format.model';

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('SportFormat', () => {
  test('should instantiate with no errors', () => {
    expect(() => new SportFormat()).not.toThrowError();
  });

  test('should assign default values if no raw object is passed in', () => {
    const sportFormat = new SportFormat();

    expect(sportFormat.id).toBeNull();
    expect(sportFormat.name).toBe('');
    expect(sportFormat.sport).toBeNull();
  });

  test('should assign default values if partial data is passed in', () => {
    let rawData = {};
    let sportFormat = new SportFormat(rawData);

    expect(sportFormat.id).toBeNull();
    expect(sportFormat.name).toBe('');
    expect(sportFormat.sport).toBeNull();

    rawData = { id: '1', name: 'Hello' };
    sportFormat = new SportFormat(rawData);

    expect(sportFormat.id).not.toBeNull();
    expect(sportFormat.name).not.toBe('');
    expect(sportFormat.sport).toBeNull();

    rawData = { sport: 'sportId' };
    sportFormat = new SportFormat(rawData);

    expect(sportFormat.id).toBeNull();
    expect(sportFormat.name).toBe('');
    expect(sportFormat.sport).not.toBeNull();
  });

  test('should assign values with passed in data', () => {
    let rawData = { id: '1', name: '5v5', sport: 'sportId' };
    let sportFormat = new SportFormat(rawData);

    expect(sportFormat.id).toBe(rawData.id);
    expect(sportFormat.name).toBe(rawData.name);
    expect(sportFormat.sport).toBe(rawData.sport);

    rawData = { id: '2', name: '3v3', sport: 'sportId2' };
    sportFormat = new SportFormat(rawData);

    expect(sportFormat.id).toBe(rawData.id);
    expect(sportFormat.name).toBe(rawData.name);
    expect(sportFormat.sport).toBe(rawData.sport);
  });
});
