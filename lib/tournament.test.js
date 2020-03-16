/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
const getTournament = require('./tournament');

/* ––
 * –––– Tests declaration
 * –––––––––––––––––––––––––––––––– */
describe('Tournament:', () => {
  test('should return tournament data', () => {
    const tournament = getTournament('1234');

    expect(tournament).toBe('Tournament 1234');
  });
});
