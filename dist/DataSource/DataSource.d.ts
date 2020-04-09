export interface DataSource<T, O> {
    getData(options?: any): Promise<T[]>;
    getOptions(): O;
}
export declare class SimpleDataSource<T, O> implements DataSource<T, O> {
    private readonly data;
    constructor(data: T[]);
    getData(options?: any): Promise<T[]>;
    getOptions(): O;
}
