import React from "react";
import {DataSource} from "../../DataSource/DataSource";
import {KeyExtractor} from "../KeyExtractor/KeyExtractor";
import {BaseCollectionRenderOptions} from "../Config/CollectionRenderOptions";

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


export abstract class BaseCollectionContainer<Props extends BaseCollectionContainerProps = BaseCollectionContainerProps,
    State extends BaseCollectionContainerState = BaseCollectionContainerState>
    extends React.Component<Props, State>
    implements CollectionContainer {

    protected constructor(props: Props) {
        super(props);
        this.state = {data: [], error: null, loading: true} as any;
    }

    componentDidMount(): void {
        if (this.props.onFetchStart)
            this.props.onFetchStart();
        this.startDataFetch();
    }

    startDataFetch(): any {
        const {dataSource} = this.props;
        this.setState({loading: true, error: false});
        dataSource.getData()
            .then(data => {
                this.setState({loading: false, error: null, data: data});
                if (this.props.onFetchDone)
                    this.props.onFetchDone(data);
            })
            .catch(e => {
                this.setState({loading: false, error: e, data: []});
                if (this.props.onFetchFail)
                    this.props.onFetchFail(e);
            });
    }

    render(): any {
        if (this.state.loading)
            return this.renderLoading();
        if (this.state.error)
            return this.renderError(this.state.error);
        if (this.state.data.length === 0 && !this.state.loading)
            return this.renderEmpty();
        return this.renderCollection();
    }

    renderEmpty(): any {
        if (this.props.renderEmpty)
            return this.props.renderEmpty();
        return null;
    }

    renderError(e: any): any {
        if (this.props.renderError)
            return this.props.renderError(e);
        return null;
    }

    renderLoading(): any {
        if (this.props.renderLoading)
            return this.props.renderLoading();
        return null;
    }

    public abstract renderCollection(): any;

    public appendItemAt = (index: number, item: any) => {
        const data = [...this.state.data];
        data.splice(index, 0, item);
        this.setState({data: data});
    };

    public appendItemFirst = (item: any): void => {
        this.appendItemAt(0, item);
    };

    public appendItemLast = (item: any): void => {
        const data = [...this.state.data];
        data.push(item);
        this.setState({data: data});
    };

    public removeAt = (index: number): void => {
        const data = [...this.state.data];
        data.splice(index, 1);
        this.setState({data: data});
    };


    public updateItem = (index: number, item: any) => {
        const data = [...this.state.data];
        data[index] = item;
        this.setState({data: data});
    };

    getData(): any[] {
        return this.state.data;
    }

}
