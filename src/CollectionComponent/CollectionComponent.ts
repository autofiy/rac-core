import React from "react";
import {KeyExtractor} from "../KeyExtractor/KeyExtractor";

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

export abstract class BaseCollectionComponent<ItemDataType, RenderOptions,
    Props extends BaseCollectionComponentProps<ItemDataType, RenderOptions>, State>
    extends React.Component<Props, State>
    implements CollectionComponent<ItemDataType, RenderOptions> {

    public abstract render(): any;

    getData(): ItemDataType[] {
        return this.props.data;
    }

    getRenderOptions(): RenderOptions {
        return this.props.renderOptions;
    }
}