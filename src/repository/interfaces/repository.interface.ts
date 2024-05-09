export interface IRepository<T> {
  findOneBy(criteria: Partial<T>): Promise<T | undefined>;
  save(user: T): Promise<T>;
  findAll(): Promise<T[]>;
  delete(criteria: Partial<T>): Promise<void>;
  // Add other methods as needed
}
