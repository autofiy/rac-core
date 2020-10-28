import React, {Component} from "react";
import {IAutoCollection} from "./IAutoCollection";
import {CollectionRenderer} from "../Services/CollectionRenderer";
import {AutoCollectionDefault} from "../AutoCollectionDefault";
import {AutoCollectionProps, AutoCollectionState} from "./AutoCollectionProps";
import {AutoCollectionEvent} from "./AutoCollectionEvent";
import {AutoCollectionData} from "./AutoCollectionData";
import {DataFetcher} from "../Services/Fetcher/DataFetcher";
import {getService} from "./AutoCollectionService";

export class AutoCollection extends Component<AutoCollectionProps, AutoCollectionState> implements IAutoCollection {

    private readonly renderService: CollectionRenderer<any>;
    private readonly fetcherService: DataFetcher<any>;

    constructor(props: AutoCollectionProps) {
        super(props);

        this.fetcherService = getService<DataFetcher<any>>("fetcher", this);
        this.renderService = getService<CollectionRenderer<any>>("renderer", this);

        this.state = {
            data: AutoCollectionDefault.initialData,
            loading: false,
            error: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    private fetchData(): void {
        this.fetcherService.fetch();
    }

    render() {
        return <div className={'rac-container'}>
            {
                this.renderService.render()
            }
        </div>
    }

    data(): AutoCollectionData {
        return null as any;
    }

    event(): AutoCollectionEvent {
        return null as any;
    }

    getProps(): AutoCollectionProps {
        return this.props;
    }

    getError(): any {
        return this.state.error;
    }

    isLoading(): boolean {
        return this.state.loading;
    }


    getConfiguration(): AutoCollectionState {
        return this.state;
    }

    refreshData(): void {

    }

    updateConfiguration(configuration: Partial<AutoCollectionState>, afterChange?: () => void) {
        return this.setState(configuration as any, afterChange);
    }


}