import React from "react";
import {AutoCollectionState, PropertiesConfiguration} from "../AutoCollection/AutoCollectionProps";

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
    initialData: any;
}

export const AutoCollectionDefault: IAutoCollectionDefault = {


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


    initialData: []
};