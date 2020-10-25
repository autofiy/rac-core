import {IAutoCollection} from "../IAutoCollection";

export interface DataFetcher<Options> {
    fetch(): Promise<any>;

    getOptions(): Options;
}


export abstract class DataFetcherBase<Options> implements DataFetcher<Options> {

    private readonly collection: IAutoCollection;

    protected constructor(collection: IAutoCollection) {
        this.collection = collection;
    }

    abstract fetch(): Promise<any>;

    getOptions(): Options {
        return this.collection.getProps().extra?.dataSourceOptions ?? {};
    }
}


export class DirectDataFetcher extends DataFetcherBase<any> {
    private readonly data: any;

    public constructor(collection: IAutoCollection) {
        super(collection);
    }

    fetch(): Promise<any> {
        return new Promise<any>(resolve => resolve(this.data));
    }
}
