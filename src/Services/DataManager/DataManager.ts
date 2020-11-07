import {Service, ServiceBase} from "../Base/Service";
import {EventType} from "../EventManager/EventType";

export interface DataManager extends Service {

    get(): any;

    set(data: any, afterChange?: () => void): void;

    insertLast(item: any, afterChange?: () => any): void;

    insertFirst(item: any, afterChange?: () => any): void;

    insertAt(index: number, item: any, afterChange?: () => any): void;

    removeAt(index: number, afterChange?: () => any): void;

    updateItemAt(index: number, newItem: any, afterChange?: () => any): void;

    filter(predicate: (item: any) => boolean, afterChange?: () => any): void;

    clearFilter(afterChange?: () => any): void;

    order(orderFunc: (items: any) => any[], afterChange?: () => any): void;

}


export class DefaultDataManager extends ServiceBase implements DataManager {

    get(): any {
        return this.getAutoCollection().getState().data;
    }

    set(data: any, afterChange?: () => void) {
        this.getAutoCollection().updateState({
            data: data,
            all: data,
            filtered: false
        }, afterChange);
    }

    clearFilter(afterChange?: () => any): void {
        const all = [...this.getAutoCollection().getState().all];
        this.getAutoCollection().updateState({
            data: all,
            filtered: false
        }, afterChange);
        this.getAutoCollection().event().emit(EventType.DATA_FILTER_CLEARED, {});
    }

    filter(predicate: (item: any) => boolean, afterChange?: () => any): void {
        const items: any[] = [...this.getAutoCollection().getState().all];
        const filteredData = items.filter(predicate);
        this.getAutoCollection().updateState({
            filtered: true,
            data: filteredData
        }, afterChange);
        this.getAutoCollection().event().emit(EventType.DATA_FILTERED, filteredData);
    }

    insertAt(index: number, item: any, afterChange?: () => any): void {
        const items: any[] = [...this.getAutoCollection().getState().all];
        items.splice(index, 0, item);
        this.getAutoCollection().updateState({
            all: items
        }, afterChange);
        this.getAutoCollection().event().emit(EventType.ITEM_ADDED, {index: index, item: item});
    }

    insertFirst(item: any, afterChange?: () => any): void {
        this.insertAt(0, item, afterChange);
    }

    insertLast(item: any, afterChange?: () => any): void {
        const items: any[] = [...this.getAutoCollection().getState().all];
        items.push(item);
        this.getAutoCollection().updateState({
            all: items
        }, afterChange);
        this.getAutoCollection().event().emit(EventType.ITEM_ADDED, {index: items.length - 1, item: item});
    }

    order(orderFunc: (items: any) => any[], afterChange?: () => any): void {
        const items = orderFunc(this.getAutoCollection().getState().data);
        this.getAutoCollection().updateState({
            data: items
        }, afterChange);
        this.getAutoCollection().event().emit(EventType.DATA_REORDERED, items);
    }

    removeAt(index: number, afterChange?: () => void): void {
        const items: any[] = [...this.getAutoCollection().getState().all];
        const removedItem = items[index];
        items.splice(index, 1);
        this.getAutoCollection().updateState({
            all: items
        }, afterChange);
        this.getAutoCollection().event().emit(EventType.ITEM_REMOVED, removedItem);
    }

    updateItemAt(index: number, newItem: any , afterChange? : () => void): void {
        const items = [...this.getAutoCollection().getState().all];
        const oldItem = items[index];
        items.splice(index, 1, newItem);
        this.getAutoCollection().updateState({
            all: items
        }, afterChange);
        this.getAutoCollection().event().emit(EventType.ITEM_MODIFIED, {old: oldItem, new: newItem, index: index});
    }

}

