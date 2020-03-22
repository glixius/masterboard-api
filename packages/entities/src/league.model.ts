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
    this.id = rawData.id || null;
    this.name = rawData.name || '';
    this.members = rawData.members || [];
    this.code = rawData.code || '';
  }
}
