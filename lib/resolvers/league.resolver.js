/* ––
 * –––– Resolver declaration
 * –––––––––––––––––––––––––––––––– */
class LeagueResolver {
  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(rawObject) {
    this.id = rawObject.id;
    this.name = rawObject.get('Name');
    this.members = rawObject.get('Members');
    this.code = rawObject.get('Code');
  }
}

/* ––
 * –––– Exports
 * –––––––––––––––––––––––––––––––– */
module.exports = LeagueResolver;
