export interface PropertyConfig {
    name: string | number;
    title: string;
}
export interface Property {
    getName(): string | number;
    getTitle(): string;
}
export declare class SimpleProperty<P extends PropertyConfig> implements Property {
    protected config: P;
    constructor(config: P);
    getName(): string | number;
    getTitle(): string;
}
export interface CollectionRenderOptions<P extends Property> {
    getProperties(data: any): P[];
    getCollectionWrapper(): any;
    getWrapperProps(): any;
    getCollectionProps(): any;
    getCollectionClassName(): string;
    getBeforeCollectionRender(): any;
    getAfterCollectionRender(): any;
}
export interface CollectionRenderOptionsConfig {
    collectionClassName?: string;
    collectionProps?: any;
    wrapper?: any;
    wrapperProps?: any;
    renderItem?: (item: any, index: number, key: any, properties: any[]) => any;
    renderBeforeCollection?: () => any;
    renderAfterCollection?: () => any;
}
export declare abstract class BaseCollectionRenderOptions<P extends Property, Config extends CollectionRenderOptionsConfig> implements CollectionRenderOptions<P> {
    protected readonly config: Config;
    constructor(config: Config);
    getCollectionClassName(): string;
    getCollectionProps(): any;
    getCollectionWrapper(): any;
    getWrapperProps(): any;
    getCustomItemRender(): ((item: any, index: number, key: any, properties: P[]) => any) | undefined;
    getBeforeCollectionRender(): any;
    getAfterCollectionRender(): any;
    abstract getProperties(data: any): P[];
}
