import {DataFetcher} from "./DataSource/DataFetcher";

export interface IAutoCollection {
    render(): any;

    getProps(): AutoCollectionProps;

    event(): AutoCollectionEvent;

    data(): AutoCollectionData;

    isLoading(): boolean;

    getError(): any;

    updateConfiguration(state: Partial<AutoCollectionState>, afterChange?: () => void): void;

    getConfiguration(): AutoCollectionState;
}

export interface AutoCollectionEvent {

}

export interface AutoCollectionData {
    get(): any;
}

export interface AutoCollectionProps {
    as: any;
    extra?: {
        customStateFromResponse?: (response: any) => Promise<AutoCollectionState>;
        dataSourceOptions?: any;
        renderOptions?: any;
        [propertyName: string]: any;
    };
    fetcher: DataFetcher<any>;
}

export interface AutoCollectionState {
    data: any;
    loading: boolean;
    error: any;
}