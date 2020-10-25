import React, {Component} from "react";
import {
    AutoCollectionData,
    AutoCollectionEvent,
    AutoCollectionProps,
    AutoCollectionState,
    IAutoCollection
} from "./IAutoCollection";
import {CollectionRenderer} from "./Services/CollectionRenderer";
import {SimpleCollectionRenderer} from "./Services/SimpleCollectionRenderer";
import {AutoCollectionDefault} from "./AutoCollectionDefault";

export class AutoCollection extends Component<AutoCollectionProps, AutoCollectionState> implements IAutoCollection {

    private readonly renderService: CollectionRenderer<any>;


    constructor(props: AutoCollectionProps) {
        super(props);
        this.renderService = new SimpleCollectionRenderer(this);

        this.state = {
            data: AutoCollectionDefault.initialData,
            loading: false,
            error: null
        };
    }

    componentDidMount() {
        const {fetcher} = this.props;
        this.setState({loading: true, data: AutoCollectionDefault.initialData, error: null});
        fetcher.fetch()
            .then(response => {
                const customState = this.props.extra?.customStateFromResponse ?? AutoCollectionDefault.customStateFromResponse;
                return customState(response);
            })
            .then(state => this.setState(state))
            .catch(error => this.setState({error: error, loading: false, data: AutoCollectionDefault.initialData}));
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


    updateConfiguration(configuration: Partial<AutoCollectionState>, afterChange?: () => void) {
        return this.setState(configuration as any, afterChange);
    }


}