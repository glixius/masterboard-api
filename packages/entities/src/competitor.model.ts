/* ––
 * –––– Model declaration
 * –––––––––––––––––––––––––––––––– */
export class Competitor {
  /* –– Properties
   * –––––––––––––––––––––––––––––––– */
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  nickname: string;
  displayName: string;
  leagues: string[];

  /* –– Constructor
   * –––––––––––––––––––––––––––––––– */
  constructor(rawData?: any) {
    this.id = (rawData && rawData.id) || null;
    this.email = (rawData && rawData.email) || '';
    this.firstname = (rawData && rawData.firstname) || '';
    this.lastname = (rawData && rawData.lastname) || '';
    this.nickname = (rawData && rawData.nickname) || '';
    this.displayName = (rawData && rawData.displayName) || '';
    this.leagues = (rawData && rawData.leagues) || [];
  }

  /* –– Getters/Setters
   * –––––––––––––––––––––––––––––––– */
  get fullname() {
    if (this.firstname) {
      return this.lastname ? `${this.firstname} ${this.lastname}` : this.firstname;
    }
    return '';
  }
}
