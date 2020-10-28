import {Property} from "../Collection/CollectionProperties";
import {DataFetcher} from "../Services/Fetcher/DataFetcher";
import {IAutoCollection} from "./IAutoCollection";
import {CollectionRenderer} from "../Services/CollectionRenderer";

export interface PropertiesConfiguration {
    properties?: Property[];
    titles?: { [name: string]: string };
    extraProperties?: Property[];
    orderBy?: string[] | ((properties: Property[]) => string[]);
}

export interface AutoCollectionPropsExtra {
    customStateFromResponse?: (response: any) => Promise<AutoCollectionState>;
    dataSourceOptions?: any;
    renderOptions?: any;

    [propertyName: string]: any;
}


export interface AutoCollectionServices {
    fetcher: (autoCollection: IAutoCollection) => DataFetcher<any>;
    renderer: (autoCollection: IAutoCollection) => CollectionRenderer<any>
}

export interface AutoCollectionProps {
    as: any;
    extra?: AutoCollectionPropsExtra;
    properties?: PropertiesConfiguration;
    services?: AutoCollectionServices;
}

export interface AutoCollectionState {
    data: any;
    loading: boolean;
    error: any;
}