/* ––
 * –––– Entity declaration
 * –––––––––––––––––––––––––––––––– */
export class SportFormat {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  id: string;
  name: string;
  sport: string;

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(rawData?: any) {
    this.id = (rawData && rawData.id) || null;
    this.name = (rawData && rawData.name) || '';
    this.sport = (rawData && rawData.sport) || null;
  }
}
