import React from "react";
import {AutoCollectionState} from "./IAutoCollection";

export interface IAutoCollectionDefault {
    customStateFromResponse: (response: any) => Promise<AutoCollectionState>;
    httpMethod: string;

    renderLoading: () => any;
    renderError: (error: any) => any;


    initialData: any;
}

export const AutoCollectionDefault: IAutoCollectionDefault = {

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