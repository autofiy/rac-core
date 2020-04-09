import { DataSource } from "./DataSource";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
export interface AxiosFetchOption {
    url: string;
    method: "get" | "post";
    config?: AxiosRequestConfig;
    axiosDataRequest?: any;
    extractDataFromResponse?: (response: AxiosResponse) => any;
}
export declare class AxiosDataSource<T = any> implements DataSource<T, AxiosFetchOption> {
    private readonly options;
    constructor(options: AxiosFetchOption);
    getData(): Promise<any>;
    protected getPromise(url: string, axiosDataRequest?: any, axiosConfig?: AxiosRequestConfig): AxiosPromise;
    getOptions(): AxiosFetchOption;
    protected getDataFromResponse(response: AxiosResponse): T[];
}
