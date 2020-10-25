import {DataFetcherBase} from "./DataFetcher";
import {AutoCollectionDefault} from "../AutoCollectionDefault";

export interface HttpDataFetcherOptions {
    url: string;
    method?: string;
    fetch?: () => Promise<any>;
    query?: any;
    body?: any;
    headers?: any;
    fetchInitOptions?: any;
}

export class HttpDataFetcher extends DataFetcherBase<HttpDataFetcherOptions> {

    fetch(): Promise<any> {
        let customFetch = this.getOptions().fetch;
        if (customFetch) {
            return customFetch();
        }
        const url = this.getOptions().url;
        return fetch(url, {
            method: this.getOptions().method ?? AutoCollectionDefault.httpMethod,
            body: this.getOptions().body,
            headers: this.getOptions().headers,
            ...this.getOptions().fetchInitOptions
        });
    }

}