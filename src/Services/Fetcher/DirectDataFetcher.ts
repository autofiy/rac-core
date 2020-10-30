import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {DataFetcherBase} from "./DataFetcher";

export class DirectDataFetcher extends DataFetcherBase<any> {
    private readonly data: any;

    public constructor(collection: IAutoCollection) {
        super(collection);
        this.data = collection.getProps().extra?.dataSourceOptions?.data ?? [];
    }

    protected fetchData(): Promise<any> {
        return new Promise<any>(resolve => resolve(this.data));
    }

    protected startFetching() {
    }

    protected errorFetching(error: any) {
    }
}