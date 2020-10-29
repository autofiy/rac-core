import {AutoCollectionProps, AutoCollectionState} from "./AutoCollectionProps";
import {AutoCollectionEvent} from "./AutoCollectionEvent";

export interface IAutoCollection {
    render(): any;

    getProps(): AutoCollectionProps;

    event(): AutoCollectionEvent;

    refreshData(): void;

    isLoading(): boolean;

    getError(): any;

    updateConfiguration(state: Partial<AutoCollectionState>, afterChange?: () => void): void;

    getConfiguration(): AutoCollectionState;
}






