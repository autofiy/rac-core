export interface KeyExtractor<T = any, R = any> {
    getKey(index: number, item: T): R;
}

export class IndexedKeyExtractor implements KeyExtractor<any, number> {
    getKey(index: number, item: any): number {
        return index;
    }

}

export class PropertyKeyExtractor implements KeyExtractor {
    private readonly key: any;

    constructor(key: any) {
        this.key = key;
    }

    getKey(index: number, item: any): any {
        return item[this.key];
    }
}