import React from "react";
import { KeyExtractor } from "../KeyExtractor/KeyExtractor";
import { CollectionRenderOptions, Property } from "../Config/CollectionRenderOptions";
export interface CollectionComponent<ItemDataType, RenderOptions> {
    render(): any;
    getData(): ItemDataType[];
    getRenderOptions(): RenderOptions;
}
export interface BaseCollectionComponentProps<ItemDataType, RenderOptions> {
    data: ItemDataType[];
    keyExtractor: KeyExtractor;
    renderOptions: RenderOptions;
}
export declare abstract class BaseCollectionComponent<PropertyType extends Property, ItemDataType, RenderOptions extends CollectionRenderOptions<PropertyType>, Props extends BaseCollectionComponentProps<ItemDataType, RenderOptions>, State> extends React.Component<Props, State> implements CollectionComponent<ItemDataType, RenderOptions> {
    render(): any;
    protected renderWrapper: (collectionComponent: any) => any;
    protected renderBeforeCollection: () => any;
    protected renderAfterCollection: () => any;
    protected abstract renderCollection(): any;
    getData(): ItemDataType[];
    getRenderOptions(): RenderOptions;
}
