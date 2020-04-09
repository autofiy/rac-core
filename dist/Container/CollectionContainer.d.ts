import React from "react";
import { DataSource } from "../DataSource/DataSource";
import { KeyExtractor } from "../KeyExtractor/KeyExtractor";
import { BaseCollectionRenderOptions } from "../Config/CollectionRenderOptions";
export interface CollectionContainer {
    startDataFetch(): void;
    renderLoading(): any;
    renderError(e: any): any;
    renderEmpty(): any;
    renderCollection(): any;
    render(): any;
    getData(): any[];
}
export interface BaseCollectionContainerProps<RenderOptions extends BaseCollectionRenderOptions<any, any> = any> {
    renderEmpty?: () => any;
    renderError?: (error: any) => any;
    renderLoading?: () => any;
    dataSource: DataSource<any, any>;
    collectionOptions: RenderOptions;
    keyExtractor?: KeyExtractor;
    onFetchDone?: (data: any) => void;
    onFetchFail?: (e: any) => void;
    onFetchStart?: () => void;
}
export interface BaseCollectionContainerState<T = any> {
    data: T[];
    loading: boolean;
    error: any;
}
export declare abstract class BaseCollectionContainer<Props extends BaseCollectionContainerProps = BaseCollectionContainerProps, State extends BaseCollectionContainerState = BaseCollectionContainerState> extends React.Component<Props, State> implements CollectionContainer {
    protected constructor(props: Props);
    componentDidMount(): void;
    startDataFetch(): any;
    render(): any;
    renderEmpty(): any;
    renderError(e: any): any;
    renderLoading(): any;
    abstract renderCollection(): any;
    appendItemAt: (index: number, item: any) => void;
    appendItemFirst: (item: any) => void;
    appendItemLast: (item: any) => void;
    removeAt: (index: number) => void;
    updateItem: (index: number, item: any) => void;
    getData(): any[];
}
