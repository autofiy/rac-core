import {DefaultOrdererFactory, Generator, PropertiesConfiguration, SmartGenerator} from '@autofiy/property';
import {IAutoCollection} from "./IAutoCollection";
import {DataFetcher} from "../Services/Fetcher/DataFetcher";
import {CollectionRenderer} from "../Services/Renderer/CollectionRenderer";
import {DataManager, DefaultDataManager} from "../Services/DataManager/DataManager";
import {DefaultEventManager, EventCallback, EventManager} from "../Services/EventManager/EventManager";
import {EventType} from "../Services/EventManager/EventType";
import {AutofiyableProps, ServiceCallback, ServiceConfiguration as SC} from "@autofiy/autofiyable";
import {SimpleCollectionRenderer} from '../Services/Renderer/SimpleCollectionRenderer';
import {DirectDataFetcher} from '../Services/Fetcher/DirectDataFetcher';

export interface AutoCollectionProps
    extends AutofiyableProps<ServiceConfiguration, AutoCollectionPropsExtra> {
    as?: any;
    properties?: PropertiesConfiguration;
    on?: { [event in EventType]: EventCallback };
}

export interface ServiceConfiguration extends SC {
    fetcher: ServiceCallback<DataFetcher<any>>
    renderer: ServiceCallback<CollectionRenderer>,
    propertyGenerator: ServiceCallback<Generator>,
    dataManager: ServiceCallback<DataManager>;
    eventManager: ServiceCallback<EventManager>;
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

export const DefaultPropertiesConfiguration: PropertiesConfiguration = {};

export const DefaultServices: ServiceConfiguration = {
    fetcher: (ac: IAutoCollection) => new DirectDataFetcher(ac),
    renderer: (ac: IAutoCollection) => new SimpleCollectionRenderer(ac),
    propertyGenerator: (ac: IAutoCollection) => {
        const config = ac.getProps().properties ?? DefaultPropertiesConfiguration
        return new SmartGenerator(config, ac.data().get()[0] ?? {}, new DefaultOrdererFactory(config));
    },
    dataManager: ac => new DefaultDataManager(ac),
    eventManager: ac => new DefaultEventManager(ac),
}
