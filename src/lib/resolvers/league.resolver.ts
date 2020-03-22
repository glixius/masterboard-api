/* ––
 * –––– Resolver declaration
 * –––––––––––––––––––––––––––––––– */
export class LeagueResolver {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  id: string;
  name: string;
  members: string[];
  code: string;

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(rawObject) {
    this.id = rawObject.id;
    this.name = rawObject.get('Name');
    this.members = rawObject.get('Members');
    this.code = rawObject.get('Code');
  }
}
