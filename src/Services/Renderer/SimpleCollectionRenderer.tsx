import {CollectionRendererBase} from "./CollectionRenderer";
import React from "react";
import {AutoCollectionDefault} from "../../Default/AutoCollectionDefault";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";

export interface SimpleCollectionRenderOption {
    renderEmpty: () => any;
    renderCollectionOnError?: boolean;
    renderCollectionOnLoading: boolean;
    renderLoading?: () => void
    renderError?: (error: any) => void;
    loadingPosition?: "top" | "bottom";
    errorPosition?: "top" | "bottom";
    displayTableWhenEmpty?: boolean;
    positioning: (loading: any, error: any, component: any) => any[];
}

export class SimpleCollectionRenderer extends CollectionRendererBase<SimpleCollectionRenderOption> {

    public constructor(autoCollection: IAutoCollection) {
        super(autoCollection);
    }

    render(): any {
        const content = this.renderInPositions();
        return <div>{content}</div>
    }

    protected renderLoading(): any {
        if (this.getAutoCollection().isLoading()) {
            const renderLoading = this.getOptions().renderLoading ?? this.defaultRenderLoading;
            return renderLoading();
        }
        return null;
    }

    protected defaultRenderLoading = (): any => {
        return AutoCollectionDefault.renderLoading();
    }

    protected renderError(): any {
        let error = this.getAutoCollection().getError();
        if (error) {
            const renderError = this.getOptions().renderError ?? this.defaultRenderError;
            return renderError(error);
        }
        return null;
    }

    protected renderEmpty(): any {
        if (this.getAutoCollection().data().get()?.length === 0) {
            const renderEmpty = this.getOptions().renderEmpty ?? this.defaultRenderEmpty;
            return renderEmpty();
        }
        return null;
    }

    protected defaultRenderError = (error: any): any => {
        return AutoCollectionDefault.renderError(error);
    }

    protected defaultRenderEmpty = () => {
        return AutoCollectionDefault.renderEmpty();
    }

    protected renderCollection(): any {
        const CollectionComponent = this.getAutoCollection().getProps().as ?? this.getDefaultCollectionComponent();
        return <CollectionComponent propertyGenerator={this.getAutoCollection().getPropertyGenerator()}
                                    data={this.getAutoCollection().data().get()}
                                    autoCollection={this.getAutoCollection()}/>
    }

    protected getDefaultCollectionComponent() {
        return AutoCollectionDefault.component;
    }

    protected renderInPositions(): any {
        const loading = this.renderLoading();
        const error = this.renderError();
        const collection = this.renderCollection();
        const empty = this.renderEmpty();
        const positions = this.handlePositioning(loading, error, empty, collection);
        return <React.Fragment>
            {positions[0]}
            {positions[1]}
            {positions[2]}
            {positions[3]}
        </React.Fragment>
    }

    protected handlePositioning(loading: any, error: any, empty: any, collection: any): any[] {
        const elements: any[] = [];
        const options = this.getOptions();
        if (options.loadingPosition === "top" || options.loadingPosition === undefined) {
            elements.push(loading);
        }
        if (options.errorPosition === "top" || options.errorPosition === undefined) {
            elements.push(error);
        }

        const emptyComponent = !loading && !error ? empty : null;
        elements.push((options.displayTableWhenEmpty && emptyComponent) || !emptyComponent ? collection : null);
        elements.push(emptyComponent);

        if (options.loadingPosition === "bottom") {
            elements.push(loading);
        }
        if (options.errorPosition === "bottom") {
            elements.push(error);
        }
        return elements;
    }

}