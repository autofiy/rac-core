import React, {Component} from "react";
import {IAutoCollection} from "./IAutoCollection";
import {CollectionRenderer} from "../Services/Renderer/CollectionRenderer";
import {AutoCollectionDefault} from "../AutoCollectionDefault";
import {AutoCollectionProps, AutoCollectionState} from "./AutoCollectionProps";
import {EventManager} from "../Services/EventManager/EventManager";
import {DataFetcher} from "../Services/Fetcher/DataFetcher";
import {PropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";
import {DataManager} from "../Services/DataManager/DataManager";


export class AutoCollection extends Component<AutoCollectionProps, AutoCollectionState> implements IAutoCollection {

    private readonly renderService: CollectionRenderer<any>;
    private readonly fetcherService: DataFetcher<any>;
    private readonly propertyGenerator: PropertyGenerator;
    private readonly dataManager: DataManager;
    private readonly eventManager: EventManager;

    constructor(props: AutoCollectionProps) {
        super(props);

        const serviceProvider = AutoCollectionDefault.serviceProvider;
        this.fetcherService = serviceProvider.getService<DataFetcher<any>>("fetcher", this);
        this.renderService = serviceProvider.getService<CollectionRenderer<any>>("renderer", this);
        this.propertyGenerator = serviceProvider.getService<PropertyGenerator>("propertyGenerator", this);
        this.dataManager = serviceProvider.getService<DataManager>("dataManager", this);
        this.eventManager = serviceProvider.getService<EventManager>("eventManager", this);

        this.state = {
            data: AutoCollectionDefault.initialData,
            loading: false,
            error: null
        };
    }

    getPropertyGenerator(): PropertyGenerator {
        return this.propertyGenerator;
    }

    componentDidMount() {
        this.fetchData();
    }

    private fetchData(): void {
        this.fetcherService.fetch();
    }

    render() {
        return this.renderService.render();
    }

    event(): EventManager {
        return this.eventManager;
    }

    data(): DataManager {
        return this.dataManager;
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
        if (!this.isLoading()){
            this.fetchData();
        }
    }

    updateConfiguration(configuration: Partial<AutoCollectionState>, afterChange?: () => void) {
        return this.setState(configuration as any, afterChange);
    }


}