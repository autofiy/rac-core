import {DataFetcherBase, FetcherOptions} from "./DataFetcher";
import {AutoCollectionDefault} from "../../AutoCollectionDefault";

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
        return this.sendPromise(url);
    }

    private sendPromise(url: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const data = await this.send(url);
                resolve(data);
            } catch (e) {
                reject(e);
            }
        })
    }

    private async send(url: string) {
        const response = await fetch(url, {
            ...AutoCollectionDefault.otherHttpRequestOptions,
            method: this.getOptions().method ?? AutoCollectionDefault.httpMethod,
            body: this.getOptions().body
            ,
            headers: this.getOptions().headers ?? AutoCollectionDefault.defaultHeaders,
            ...this.getOptions().fetchInitOptions,
        });
        const extractData = this.getOptions().extractDataFromResponse ?? AutoCollectionDefault.extractDataFromResponse;
        return await extractData(response);
    }
    
}