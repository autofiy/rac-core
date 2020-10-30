import React from "react";
import {AutoCollectionState, PropertiesConfiguration, ServiceConfiguration} from "./AutoCollection/AutoCollectionProps";
import {SimpleCollectionRenderer} from "./Services/Renderer/SimpleCollectionRenderer";
import {IAutoCollection} from "./AutoCollection/IAutoCollection";
import {DirectDataFetcher} from "./Services/Fetcher/DirectDataFetcher";
import {SmartPropertyGenerator} from "./Services/PropertyServices/PropertyGenerator";
import {DefaultAutoCollectionData} from "./Services/DataManager/DataManager";
import {DefaultEventManager} from "./Services/EventManager/EventManager";
import {IServiceProvider, ServiceProvider} from "./Services/Base/ServiceProvider";

export interface IAutoCollectionDefault {
    defaultPropertiesConfiguration: PropertiesConfiguration;
    extractDataFromResponse: (response: Response) => Promise<any>;
    defaultHeaders: any;
    otherHttpRequestOptions: any;
    stateManipulator: (response: any) => AutoCollectionState;
    customStateFromResponse: (response: any) => Promise<AutoCollectionState>;
    httpMethod: string;

    renderLoading: () => any;
    renderError: (error: any) => any;

    serviceProvider: IServiceProvider;


    services: ServiceConfiguration;


    initialData: any;
}

export const AutoCollectionDefault: IAutoCollectionDefault = {

    serviceProvider: new ServiceProvider(),

    defaultPropertiesConfiguration: {},

    extractDataFromResponse: response => response.json(),
    defaultHeaders: {},
    otherHttpRequestOptions: {},
    stateManipulator: response => ({data: response, loading: false, error: null}),
    customStateFromResponse: response => {
        return new Promise<AutoCollectionState>((resolve, reject) => {
            response.json()
                .then((data: any) => resolve({loading: false, error: null, data: data}))
                .catch((error: any) => reject(error));
        });
    },
    httpMethod: "GET",
    renderLoading: () => <h1>Loading...</h1>,
    renderError: error => <h1>Error : {error}</h1>,

    services: {
        fetcher: (ac: IAutoCollection) => new DirectDataFetcher(ac),
        renderer: (ac: IAutoCollection) => new SimpleCollectionRenderer(ac),
        propertyGenerator: (ac: IAutoCollection) => new SmartPropertyGenerator(ac),
        dataManager: ac => new DefaultAutoCollectionData(ac),
        eventManager: ac => new DefaultEventManager(ac),

    },

    initialData: []
};