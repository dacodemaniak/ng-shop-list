export interface ListInterface<T> {
  add(t: T): T;
  update(t: T): void;
  remove(t: T): void;
}
