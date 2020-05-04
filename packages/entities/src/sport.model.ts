/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// App imports
import { SportFormat } from './sport-format.model';

/* ––
 * –––– Entity declaration
 * –––––––––––––––––––––––––––––––– */
export class Sport {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  id: string;
  name: string;
  formats: SportFormat[];

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(rawData?: any) {
    this.id = (rawData && rawData.id) || null;
    this.name = (rawData && rawData.name) || '';

    if (rawData && Array.isArray(rawData.formats)) {
      this.formats = rawData.formats.map((formatData) => new SportFormat(formatData));
    } else {
      this.formats = [];
    }
  }
}
