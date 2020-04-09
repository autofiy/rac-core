export interface KeyExtractor<T = any, R = any> {
    getKey(index: number, item: T): R;
}
export declare class IndexedKeyExtractor implements KeyExtractor<any, number> {
    getKey(index: number, item: any): number;
}
export declare class PropertyKeyExtractor implements KeyExtractor {
    private readonly key;
    constructor(key: any);
    getKey(index: number, item: any): any;
}
