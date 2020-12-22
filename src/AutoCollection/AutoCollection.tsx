import React from "react";
import {IAutoCollection} from "./IAutoCollection";
import {CollectionRenderer} from "../Services/Renderer/CollectionRenderer";
import {AutoCollectionDefault} from "../Default/AutoCollectionDefault";
import {AutoCollectionProps, AutoCollectionState, DefaultServices, ServiceConfiguration} from "./AutoCollectionProps";
import {EventManager} from "../Services/EventManager/EventManager";
import {DataFetcher} from "../Services/Fetcher/DataFetcher";
import {DataManager} from "../Services/DataManager/DataManager";
import {DirectDataFetcher} from "../Services/Fetcher/DirectDataFetcher";
import {HttpDataFetcher} from "../Services/Fetcher/HttpDataFetcher";
import {AutofiyableComponent} from "@autofiy/autofiyable";
import {Generator, Property} from "@autofiy/property";


export class AutoCollection
    extends AutofiyableComponent<AutoCollectionProps, AutoCollectionState, ServiceConfiguration>
    implements IAutoCollection {

    private readonly renderService: CollectionRenderer;
    private readonly fetcherService: DataFetcher<any>;
    private readonly dataManager: DataManager;
    private readonly eventManager: EventManager;

    constructor(props: AutoCollectionProps) {
        super(props);
        this.fetcherService = this.getServiceProvider().getService<DataFetcher<any>>("fetcher", this.fetchServiceCustomHandler);
        this.renderService = this.getServiceProvider().getService<CollectionRenderer>("renderer");
        this.dataManager = this.getServiceProvider().getService<DataManager>("dataManager");
        this.eventManager = this.getServiceProvider().getService<EventManager>("eventManager");
        this.state = {
            filtered: false,
            all: AutoCollectionDefault.initialData,
            data: AutoCollectionDefault.initialData,
            loading: false,
            error: null
        };
        const keys = Object.keys(props.on ?? {});
        keys.forEach(key => this.event().addListener(key, (props.on as any)[key]));
    }

    protected initializeServices(): void {
    }

    getDefaultServices(): ServiceConfiguration {
        return DefaultServices;
    }

    getProperties(): Property[] {
        const generator: Generator = this.getServiceProvider().getService("propertyGenerator");
        return generator.generate();
    }

    private fetchServiceCustomHandler = () => {
        if (this.props.extra?.dataSourceOptions?.data) {
            return new DirectDataFetcher(this);
        } else if (this.props.extra?.dataSourceOptions?.url) {
            return new HttpDataFetcher(this);
        }
        return undefined;
    }

    async componentDidMount() {
        await this.fetchData();
    }

    componentWillUnmount() {
        this.event().clearAllListeners();
        this.fetcherService.cancel();
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

    getError(): any {
        return this.state.error;
    }

    isLoading(): boolean {
        return this.state.loading;
    }

    getState(): AutoCollectionState {
        return this.state;
    }

    async refreshData(): Promise<void> {
        if (!this.isLoading()) {
            await this.fetchData();
        }
    }

    updateState(state: Partial<AutoCollectionState>, afterChange?: () => void) {
        return this.setState(state as any, afterChange);
    }

    private async fetchData(): Promise<void> {
        await this.fetcherService.fetch();
    }

}