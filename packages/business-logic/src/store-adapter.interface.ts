/* ––
 * –––– Interface declaration
 * –––––––––––––––––––––––––––––––– */
export interface StoreAdapter<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
}
