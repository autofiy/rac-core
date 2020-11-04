import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {AutoCollectionDefault} from "../../Default/AutoCollectionDefault";
import {AutoCollectionState} from "../../AutoCollection/AutoCollectionProps";


export interface FetcherOptions {
    stateManipulator?: (response: any) => AutoCollectionState;
}

export interface DataFetcher<Options extends FetcherOptions> {
    fetch(): Promise<any>;

    getOptions(): Options;
}


export abstract class DataFetcherBase<Options extends FetcherOptions> implements DataFetcher<Options> {

    private readonly autoCollection: IAutoCollection;

    constructor(collection: IAutoCollection) {
        this.autoCollection = collection;
    }

    protected getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

    fetch(): Promise<any> {
        this.startFetching();
        return new Promise<any>(async (resolve, reject) => {
            try {
                const data = await this.fetchData();
                this.doneFetching(data);
                resolve(data);
            } catch (e) {
                this.errorFetching(e)
                reject(e);
            }
        })
    }

    protected abstract fetchData(): Promise<any>;

    getOptions(): Options {
        return this.autoCollection.getProps().extra?.dataSourceOptions ?? {};
    }

    protected startFetching(): void {
        this.getAutoCollection().updateConfiguration({
            loading: true,
            error: null,
            data: AutoCollectionDefault.initialData
        });
    }

    protected doneFetching(response: any): void {
        const stateManipulator = this.getOptions().stateManipulator ?? AutoCollectionDefault.stateManipulator;
        const state = stateManipulator(response);
        this.getAutoCollection().updateConfiguration(state);
    }


    protected errorFetching(error: any): void {
        this.getAutoCollection().updateConfiguration({
            loading: false,
            error: error,
            data: AutoCollectionDefault.initialData
        });
    }
}



