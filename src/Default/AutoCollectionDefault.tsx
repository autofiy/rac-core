import React from "react";
import {AutoCollectionState, PropertiesConfiguration} from "../AutoCollection/AutoCollectionProps";

export interface IAutoCollectionDefault {
    defaultPropertiesConfiguration: PropertiesConfiguration;
    extractDataFromResponse: (response: Response) => Promise<any>;
    defaultHeaders: any;
    otherHttpRequestOptions: any;
    stateManipulator: (response: any) => AutoCollectionState;
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
    stateManipulator: response => ({data: response, loading: false, error: null, filtered: false, all: response}),
    httpMethod: "GET",
    renderLoading: () => <h1>Loading...</h1>,
    renderError: error => <h1>Error : {error}</h1>,
    initialData: []
};