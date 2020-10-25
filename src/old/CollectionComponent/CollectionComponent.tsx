import React from "react";
import {KeyExtractor} from "../KeyExtractor/KeyExtractor";
import {CollectionRenderOptions, Property} from "../Config/CollectionRenderOptions";

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

export abstract class BaseCollectionComponent<PropertyType extends Property,
    ItemDataType, RenderOptions extends CollectionRenderOptions<PropertyType>,
    Props extends BaseCollectionComponentProps<ItemDataType, RenderOptions>, State>
    extends React.Component<Props, State>
    implements CollectionComponent<ItemDataType, RenderOptions> {

    public render(): any {
        const collection = this.renderCollection();
        return this.renderWrapper(collection);
    }


    protected renderWrapper = (collectionComponent: any): any => {
        const options = this.getRenderOptions();
        const Wrapper = options.getCollectionWrapper();
        const props = options.getWrapperProps();
        return <Wrapper {...props}>
            {this.renderBeforeCollection()}
            {collectionComponent}
            {this.renderAfterCollection()}
        </Wrapper>;
    };

    protected renderBeforeCollection = () => {
        const options = this.getRenderOptions();
        const render = options.getBeforeCollectionRender();
        if (render)
            return render();
        return null;
    };

    protected renderAfterCollection = () => {
        const options = this.getRenderOptions();
        const render = options.getAfterCollectionRender();
        if (render)
            return render();
        return null;
    };

    protected abstract renderCollection(): any;

    getData(): ItemDataType[] {
        return this.props.data;
    }

    getRenderOptions(): RenderOptions {
        return this.props.renderOptions;
    }
}