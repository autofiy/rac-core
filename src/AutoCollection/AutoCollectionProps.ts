import {IAutoCollection} from "./IAutoCollection";
import {Property, PropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";
import {ServiceCallback} from "../Services/Base/Service";
import {DataFetcher} from "../Services/Fetcher/DataFetcher";
import {CollectionRenderer} from "../Services/Renderer/CollectionRenderer";
import {DataManager} from "../Services/DataManager/DataManager";
import {EventManager} from "../Services/EventManager/EventManager";

export interface AutoCollectionProps {
    as: any;
    services?: Partial<ServiceConfiguration>;
    properties?: PropertiesConfiguration;
    extra?: AutoCollectionPropsExtra;
}

export interface ServiceConfiguration {
    fetcher: ServiceCallback<DataFetcher<any>>
    renderer: ServiceCallback<CollectionRenderer<any>>,
    propertyGenerator: ServiceCallback<PropertyGenerator>,
    dataManager: ServiceCallback<DataManager>;
    eventManager: ServiceCallback<EventManager>;
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

export interface AutoCollectionPropsExtra {
    dataSourceOptions?: any;
    renderOptions?: any;

    [propertyName: string]: any;
}


export interface AutoCollectionState {
    filtered: boolean;
    all: any;
    data: any;
    loading: boolean;
    error: any;
}