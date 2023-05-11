export interface ServiceModelFactory<T> {
    createFromSerializeObject(source: object): T;
}
