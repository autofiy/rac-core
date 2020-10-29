import React from "react";
import {AutoCollectionState} from "./AutoCollection/AutoCollectionProps";
import {DataFetcher} from "./Services/Fetcher/DataFetcher";
import {CollectionRenderer} from "./Services/Renderer/CollectionRenderer";
import {SimpleCollectionRenderer} from "./Services/Renderer/SimpleCollectionRenderer";
import {IAutoCollection} from "./AutoCollection/IAutoCollection";
import {DirectDataFetcher} from "./Services/Fetcher/DirectDataFetcher";

export interface IAutoCollectionDefault {
    extractDataFromResponse: (response: Response) => Promise<any>;
    defaultHeaders: any;
    otherHttpRequestOptions: any;
    stateManipulator: (response: any) => AutoCollectionState;
    customStateFromResponse: (response: any) => Promise<AutoCollectionState>;
    httpMethod: string;

    renderLoading: () => any;
    renderError: (error: any) => any;


    services: {
        fetcher: (autoCollection: IAutoCollection) => DataFetcher<any>,
        renderer: (autoCollection: IAutoCollection) => CollectionRenderer<any>
    }


    initialData: any;
}

export const AutoCollectionDefault: IAutoCollectionDefault = {

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
        renderer: (ac: IAutoCollection) => new SimpleCollectionRenderer(ac)
    },

    initialData: []
};