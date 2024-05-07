export interface IUserRepository<T> {
  findOneBy(criteria: Partial<T>): Promise<T | undefined>;
  save(user: T): Promise<T>;
  // Add other methods as needed
}
