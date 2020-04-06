export interface DataSource<T, O> {
    getData(options?: any): Promise<T[]>

    getOptions(): O;
}


export class SimpleDataSource<T, O> implements DataSource<T, O> {

    private readonly data: T[];

    constructor(data: T[]) {
        this.data = data;
    }

    getData(options?: any): Promise<T[]> {
        return new Promise<T[]>(resolve => resolve(this.data));
    }

    getOptions(): O {
        return {} as any;
    }
}