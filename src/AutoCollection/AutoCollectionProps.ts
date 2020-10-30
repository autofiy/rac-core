import {DataFetcher} from "../Services/Fetcher/DataFetcher";
import {IAutoCollection} from "./IAutoCollection";
import {CollectionRenderer} from "../Services/Renderer/CollectionRenderer";
import {Property, PropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";
import {AutoCollectionConfigurationService} from "../Configuration/AutoCollectionConfiguration";

export interface AutoCollectionProps {
    configuration?: AutoCollectionConfigurationService;
    as: any;
    extra?: AutoCollectionPropsExtra;
    properties?: PropertiesConfiguration;
    services?: AutoCollectionServices;
}

export interface AutoCollectionPropsExtra {
    dataSourceOptions?: any;
    renderOptions?: any;

    [propertyName: string]: any;
}


export interface PropertiesConfiguration {
    properties?: Property[];
    titles?: { [name: string]: string };
    extraProperties?: Property[];
    orderBy?: string[] | ((properties: Property[]) => string[]);
    render?: {
        [name: string]: (property: Property, autoCollection: IAutoCollection) => any;
    }
}


export interface AutoCollectionServices {
    fetcher?: (autoCollection: IAutoCollection) => DataFetcher<any>;
    renderer?: (autoCollection: IAutoCollection) => CollectionRenderer<any>,
    propertyGenerator?: (autoCollection: IAutoCollection) => PropertyGenerator,
}

export interface AutoCollectionState {
    data: any;
    loading: boolean;
    error: any;
}