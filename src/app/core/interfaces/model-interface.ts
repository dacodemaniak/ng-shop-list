export interface ModelInterface<T> {
  deserialize(datas: any): T;
}
