import {AutoCollectionProps, AutoCollectionState} from "./AutoCollectionProps";
import {AutoCollectionEvent} from "../Configuration/AutoCollectionEvent";
import {AutoCollectionData} from "../Configuration/AutoCollectionData";
import {PropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";

export interface IAutoCollection {

    getPropertyGenerator(): PropertyGenerator;

    render(): any;

    getProps(): AutoCollectionProps;

    event(): AutoCollectionEvent;

    refreshData(): void;

    isLoading(): boolean;

    getError(): any;

    data(): AutoCollectionData;

    updateConfiguration(state: Partial<AutoCollectionState>, afterChange?: () => void): void;

    getConfiguration(): AutoCollectionState;
}






