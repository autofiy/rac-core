import {AutoCollectionProps, AutoCollectionState} from "./AutoCollectionProps";
import {AutoCollectionData} from "./AutoCollectionData";
import {AutoCollectionEvent} from "./AutoCollectionEvent";

export interface IAutoCollection {
    render(): any;

    getProps(): AutoCollectionProps;

    event(): AutoCollectionEvent;

    data(): AutoCollectionData;

    refreshData(): void;

    isLoading(): boolean;

    getError(): any;

    updateConfiguration(state: Partial<AutoCollectionState>, afterChange?: () => void): void;

    getConfiguration(): AutoCollectionState;
}






