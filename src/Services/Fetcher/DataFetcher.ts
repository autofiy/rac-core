import { IAutoCollection } from "../../AutoCollection/IAutoCollection";
import { AutoCollectionDefault } from "../../Default/AutoCollectionDefault";
import { AutoCollectionState } from "../../AutoCollection/AutoCollectionProps";
import { EventType } from "../EventManager/EventType";
import { Service } from "@autofiy/autofiyable";


export interface FetcherOptions {
    stateManipulator?: (response: any) => AutoCollectionState;
}

export interface DataFetcher<Options extends FetcherOptions> extends Service {
    fetch(): Promise<any>;

    getOptions(): Options;

    cancel(): void;
}


export abstract class DataFetcherBase<Options extends FetcherOptions> implements DataFetcher<Options> {

    private readonly autoCollection: IAutoCollection;
    private shouldCancel: boolean = false;

    constructor(collection: IAutoCollection) {
        this.autoCollection = collection;
    }

    fetch(): Promise<any> {
        this.shouldCancel = false;
        this.startFetching();
        return new Promise<any>(async (resolve, reject) => {
            try {
                const data = await this.fetchData();
                if (!this.shouldCancel) {
                    this.doneFetching(data);
                    resolve(data);
                }
            } catch (e) {
                if (!this.shouldCancel) {
                    this.errorFetching(e);
                    reject(e);
                }
            }
        });
    }

    getOptions(): Options {
        return this.autoCollection.getProps().extra?.dataSourceOptions ?? {};
    }

    cancel(): void {
        this.shouldCancel = true;
    }

    protected getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

    protected abstract fetchData(): Promise<any>;

    protected startFetching(): void {
        this.getAutoCollection().event().emit(EventType.FETCH_START, this.getOptions());
        this.getAutoCollection().updateState({
            loading: true,
            error: null,
            data: AutoCollectionDefault.initialData
        });
    }

    protected doneFetching(response: any): void {
        const stateManipulator = this.getOptions().stateManipulator ?? AutoCollectionDefault.stateManipulator;
        const state = stateManipulator(response);
        this.getAutoCollection().updateState(state, () => {
            this.getAutoCollection().event().emit(EventType.FETCH_DONE, state.data);
        });
    }

    protected errorFetching(error: any): void {
        this.getAutoCollection().event().emit(EventType.FETCH_FAIL, error);
        this.getAutoCollection().updateState({
            loading: false,
            error: error,
            data: AutoCollectionDefault.initialData
        });
    }
}



