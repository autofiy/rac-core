import React, {Component} from "react";
import {IAutoCollection} from "./IAutoCollection";
import {CollectionRenderer} from "../Services/Renderer/CollectionRenderer";
import {AutoCollectionDefault} from "../AutoCollectionDefault";
import {AutoCollectionProps, AutoCollectionState} from "./AutoCollectionProps";
import {AutoCollectionEvent} from "../Configuration/AutoCollectionEvent";
import {DataFetcher} from "../Services/Fetcher/DataFetcher";
import {getService} from "./AutoCollectionService";
import {PropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";
import {AutoCollectionData} from "../Configuration/AutoCollectionData";
import {getConfiguration} from "../Configuration/AutoCollectionConfiguration";

export class AutoCollection extends Component<AutoCollectionProps, AutoCollectionState> implements IAutoCollection {

    private readonly renderService: CollectionRenderer<any>;
    private readonly fetcherService: DataFetcher<any>;
    private readonly propertyGenerator: PropertyGenerator;

    private readonly dataConfigurationService: AutoCollectionData;
    private readonly eventConfigurationService: AutoCollectionEvent;

    constructor(props: AutoCollectionProps) {
        super(props);
        this.fetcherService = getService<DataFetcher<any>>("fetcher", this);
        this.renderService = getService<CollectionRenderer<any>>("renderer", this);
        this.propertyGenerator = getService<PropertyGenerator>("propertyGenerator", this);

        this.dataConfigurationService = getConfiguration<AutoCollectionData>("data", this);
        this.eventConfigurationService = getConfiguration<AutoCollectionEvent>("event", this);

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
        return <div className={'__rac-container'}>
            {
                this.renderService.render()
            }
        </div>
    }

    event(): AutoCollectionEvent {
        return this.eventConfigurationService;
    }

    data(): AutoCollectionData {
        return this.dataConfigurationService;
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
        this.fetchData();
    }

    updateConfiguration(configuration: Partial<AutoCollectionState>, afterChange?: () => void) {
        return this.setState(configuration as any, afterChange);
    }


}