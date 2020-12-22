import { AutoCollectionProps, AutoCollectionState } from "./AutoCollectionProps";
import { EventManager } from "../Services/EventManager/EventManager";
import { DataManager } from "../Services/DataManager/DataManager";
import { Property } from "@autofiy/property";
import { Autofiyable } from "@autofiy/autofiyable";
export interface IAutoCollection extends Autofiyable {

    getProperties(): Property[]

    render(): any;

    getProps(): AutoCollectionProps;

    event(): EventManager;

    refreshData(): void;

    isLoading(): boolean;

    getError(): any;

    data(): DataManager;

    updateState(state: Partial<AutoCollectionState>, afterChange?: () => void): void;

    getState(): AutoCollectionState;
}






