/* ––
 * –––– Entity declaration
 * –––––––––––––––––––––––––––––––– */
export class League {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  id: string;
  name: string;
  members: string[];
  code: string[];

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(rawData?: any) {
    this.id = (rawData && rawData.id) || null;
    this.name = (rawData && rawData.name) || '';
    this.members = (rawData && rawData.members) || [];
    this.code = (rawData && rawData.code) || '';
  }
}
