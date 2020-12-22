import {ServiceBase} from "../Base/Service";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import { Service } from "@autofiy/autofiyable";

export interface EventManager extends Service {
    emit(eventName: string, payload: any): void;

    addListener(eventName: string, callback: EventCallback): void;

    removeListener(eventName: string): void;

    clearAllListeners(): void;
}

export type EventCallback = (autoCollection: IAutoCollection, data: any) => void;


export class DefaultEventManager extends ServiceBase implements EventManager {

    private listeners: { [name: string]: EventCallback };

    constructor(autoCollection: IAutoCollection) {
        super(autoCollection);
        this.listeners = {};
    }

    addListener(eventName: string, callback: EventCallback): void {
        this.listeners[eventName] = callback;
    }

    removeListener(eventName: string): void {
        delete this.listeners[eventName];
    }

    emit(eventName: string, payload: any): void {
        const listener = this.listeners[eventName] ?? null;
        listener?.(this.getAutoCollection(), payload);
    }

    clearAllListeners() {
        this.listeners = {};
    }

}