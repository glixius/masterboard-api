/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { Competitor } from './competitor.model';

/* ––
 * –––– Tests assertions
 * –––––––––––––––––––––––––––––––– */
describe('Competitor', () => {
  test('should instantiate with no errors', () => {
    expect(() => new Competitor()).not.toThrowError();
  });
  test('should assign default values if no raw object is passed in', () => {
    const competitor = new Competitor();

    expect(competitor.id).toBeNull();
    expect(competitor.email).toBe('');
    expect(competitor.firstname).toBe('');
    expect(competitor.lastname).toBe('');
    expect(competitor.nickname).toBe('');
    expect(competitor.displayName).toBe('');
    expect(competitor.leagues).toBeInstanceOf(Array);
    expect(competitor.leagues.length).toBe(0);
  });

  test('should assign default values if partial data is passed in', () => {
    let rawData = {};
    let competitor = new Competitor(rawData);

    expect(competitor.id).toBeNull();
    expect(competitor.email).toBe('');
    expect(competitor.firstname).toBe('');
    expect(competitor.lastname).toBe('');
    expect(competitor.nickname).toBe('');
    expect(competitor.displayName).toBe('');
    expect(competitor.leagues).toBeInstanceOf(Array);
    expect(competitor.leagues.length).toBe(0);

    rawData = { id: '1', email: 'myfakeemail@mydomain.com', displayName: 'John Doe' };
    competitor = new Competitor(rawData);

    expect(competitor.id).not.toBeNull();
    expect(competitor.email).not.toBe('');
    expect(competitor.displayName).not.toBe('');
    expect(competitor.firstname).toBe('');
    expect(competitor.lastname).toBe('');
    expect(competitor.nickname).toBe('');
    expect(competitor.leagues).toBeInstanceOf(Array);
    expect(competitor.leagues.length).toBe(0);

    rawData = { leagues: ['League 1'], nickname: 'coolname', firstname: 'John', lastname: 'Doe' };
    competitor = new Competitor(rawData);

    expect(competitor.id).toBeNull();
    expect(competitor.email).toBe('');
    expect(competitor.displayName).toBe('');
    expect(competitor.firstname).not.toBe('');
    expect(competitor.lastname).not.toBe('');
    expect(competitor.nickname).not.toBe('');
    expect(competitor.leagues).not.toBe([]);
    expect(competitor.leagues.length).not.toBe(0);
  });

  test('should assign values with passed in data', () => {
    let rawData = {
      id: '1',
      email: 'myfakeemail@mydomain.com',
      leagues: ['My league'],
      nickname: 'coolname',
      firstname: 'John',
      lastname: 'Doe',
      displayName: 'John Doe',
    };
    let competitor = new Competitor(rawData);

    expect(competitor.id).toBe(rawData.id);
    expect(competitor.email).toBe(rawData.email);
    expect(competitor.firstname).toBe(rawData.firstname);
    expect(competitor.lastname).toBe(rawData.lastname);
    expect(competitor.nickname).toBe(rawData.nickname);
    expect(competitor.displayName).toBe(rawData.displayName);
    expect(competitor.leagues).toBe(rawData.leagues);

    rawData = {
      id: '1',
      email: 'myactualmail@mydomain.com',
      leagues: ['My league 2', 'My league 3'],
      nickname: 'supercoolname',
      firstname: 'Alice',
      lastname: 'Dee',
      displayName: 'Alice Dee',
    };
    competitor = new Competitor(rawData);

    expect(competitor.id).toBe(rawData.id);
    expect(competitor.email).toBe(rawData.email);
    expect(competitor.firstname).toBe(rawData.firstname);
    expect(competitor.lastname).toBe(rawData.lastname);
    expect(competitor.nickname).toBe(rawData.nickname);
    expect(competitor.displayName).toBe(rawData.displayName);
    expect(competitor.leagues).toBe(rawData.leagues);
  });

  test("should contain a method for getting competitor' full name", () => {
    const competitor = new Competitor();
    expect(competitor).toHaveProperty('fullname');
  });

  test('should build full name from competitor data', () => {
    const rawData = {
      firstname: 'Alice',
      lastname: 'Dee',
    };
    const competitor = new Competitor(rawData);

    expect(competitor.fullname).toBe('Alice Dee');
  });

  test('should return empty value if firstname does not exist', () => {
    let rawData: any = { lastname: 'Dee' };
    let competitor = new Competitor(rawData);

    expect(competitor.fullname).toBe('');

    rawData = {};
    competitor = new Competitor(rawData);

    expect(competitor.fullname).toBe('');
  });

  test('should return just firstname value if lastname does not exist', () => {
    let rawData: any = { firstname: 'Alice' };
    let competitor = new Competitor(rawData);

    expect(competitor.fullname).toBe('Alice');
  });
});
