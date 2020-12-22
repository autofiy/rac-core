import React from "react";
import {AutoCollectionState} from "../AutoCollection/AutoCollectionProps";
import {SimpleTable} from "../CollectionComponent/Table/SimpleTable";
import {PropertiesConfiguration} from "@autofiy/property";

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
    component: any;

    renderEmpty: () => any;
}

export const AutoCollectionDefault: IAutoCollectionDefault = {
    defaultPropertiesConfiguration: {},
    extractDataFromResponse: response => response.json(),
    defaultHeaders: {},
    otherHttpRequestOptions: {},
    stateManipulator: response => ({data: response, loading: false, error: null, filtered: false, all: response}),
    httpMethod: "GET",
    renderLoading: () => <h1>Loading...</h1>,
    renderError: error => <h1>Error : {String(error)}</h1>,
    renderEmpty: () => <h1>No Data</h1>,
    initialData: [],
    component: SimpleTable,
};