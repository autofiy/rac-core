import {DataSource} from "./DataSource";
import Axios, {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";

export interface AxiosFetchOption {
    url: string;
    method: "get" | "post",
    config?: AxiosRequestConfig;
    data?: any;
    extractDataFromResponse?: (response: AxiosResponse) => any;
}

export class AxiosDataSource<T = any> implements DataSource<T, AxiosFetchOption> {
    private readonly options: AxiosFetchOption;

    constructor(options: AxiosFetchOption) {
        this.options = options;
    }

    getData(): Promise<any> {
        return new Promise<T[]>((resolve, reject) => {
            this.getPromise()
                .then((response: AxiosResponse) => setTimeout(() => resolve(this.getDataFromResponse(response)), 2000))
                .catch((e: any) => reject(e))
        });
    }

    private getPromise(): AxiosPromise {
        const options = this.getOptions();
        if (options.method === "get")
            return Axios.get(options.url, options.config);
        else if (options.method === "post")
            return Axios.post(options.url, options.data, options.config);

        throw new Error(`Method ${options.method} is not supported`);
    }

    getOptions(): AxiosFetchOption {
        return this.options;
    }

    protected getDataFromResponse(response: AxiosResponse): T[] {
        const extractDataFromResponse = this.getOptions().extractDataFromResponse;
        if (extractDataFromResponse) {
            return extractDataFromResponse(response);
        }
        return response.data;
    }

}