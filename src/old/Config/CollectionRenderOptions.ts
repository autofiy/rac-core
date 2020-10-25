import React from "react";

export interface PropertyConfig {
    name: string | number;
    title: string;
}

export interface Property {
    getName(): string | number;

    getTitle(): string;
}

export class SimpleProperty<P extends PropertyConfig> implements Property {
    protected config: P;

    constructor(config: P) {
        this.config = config;
    }

    getName(): string | number {
        return this.config.name;
    }

    getTitle(): string {
        return this.config.title;
    }

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

export abstract class BaseCollectionRenderOptions<P extends Property, Config extends CollectionRenderOptionsConfig>
    implements CollectionRenderOptions<P> {

    protected readonly config: Config;

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    public constructor(config: Config) {
        this.config = config;
    }

    getCollectionClassName(): string {
        return this.config.collectionClassName ?? '';
    }

    getCollectionProps(): any {
        return this.config.collectionProps ?? {};
    }

    getCollectionWrapper(): any {
        return this.config.wrapper ?? React.Fragment;
    }

    getWrapperProps(): any {
        return this.config.wrapperProps ?? {};
    }

    getCustomItemRender(): ((item: any, index: number, key: any, properties: P[]) => any) | undefined {
        return this.config.renderItem;
    }

    getBeforeCollectionRender(): any {
        return this.config.renderBeforeCollection;
    }

    getAfterCollectionRender(): any {
        return this.config.renderAfterCollection;
    }

    abstract getProperties(data: any): P[];

}


