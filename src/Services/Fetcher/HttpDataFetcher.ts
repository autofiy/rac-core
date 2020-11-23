import {DataFetcherBase, FetcherOptions} from "./DataFetcher";
import {AutoCollectionDefault} from "../../Default/AutoCollectionDefault";

export interface HttpDataFetcherOptions extends FetcherOptions {
    url: string;
    method?: string;
    fetch?: () => Promise<any>;
    query?: any;
    body?: any;
    headers?: any;
    fetchInitOptions?: any;
    extractDataFromResponse?: (response: Response) => any;
}

export class HttpDataFetcher extends DataFetcherBase<HttpDataFetcherOptions> {

    protected fetchData(): Promise<any> {
        let customFetch = this.getOptions().fetch;
        if (customFetch) {
            return customFetch();
        }
        const url = this.getOptions().url;
        return this.send(url);
    }


    private async send(url: string) {
        const extractData = this.getOptions().extractDataFromResponse ?? AutoCollectionDefault.extractDataFromResponse;
        return fetch(url, {
            ...AutoCollectionDefault.otherHttpRequestOptions,
            method: this.getOptions().method ?? AutoCollectionDefault.httpMethod,
            body: this.getOptions().body
            ,
            headers: this.getOptions().headers ?? AutoCollectionDefault.defaultHeaders,
            ...this.getOptions().fetchInitOptions,
        }).then(data => extractData(data));
    }

}