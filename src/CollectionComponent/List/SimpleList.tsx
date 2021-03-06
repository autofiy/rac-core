import {CollectionComponentBase} from "../CollectionComponent";
import React from "react";
import {ListItemRenderer, SimpleListItemRenderer} from "./ListItemRenderer";

export class SimpleList extends CollectionComponentBase {

    private readonly itemRenderer: ListItemRenderer;

    constructor(props: any) {
        super(props);
        this.itemRenderer = this.getItemRenderer();
    }

    render() {
        return <div>
            {
                this.renderItems()
            }
        </div>
    }


    protected renderItems(): any {
        return this.getData().map((item: any, index: number) => {
            return <div key={index}>{this.itemRenderer.render(this.getProperties(), item)}</div>
        });
    }

    protected getItemRenderer(): ListItemRenderer {
        return new SimpleListItemRenderer();
    }
}