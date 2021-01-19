import React from "react";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {Property} from "@autofiy/property";

export interface CellRenderer {
    render(property: Property, data: any, rowIndex: number): any;
}

export abstract class CellRendererBase implements CellRenderer {

    private readonly autoCollection: IAutoCollection;

    constructor(autoCollection: IAutoCollection) {
        this.autoCollection = autoCollection;
    }

    render(property: Property, data: any, rowIndex: number): any {
        return <React.Fragment key={property.name}>
            {
                this.renderContent(property, data, rowIndex)
            }
        </React.Fragment>
    }

    protected getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

    protected abstract renderContent(property: Property, data: any, rowIndex: number): any;

}

export abstract class SimpleCellRendererBase extends CellRendererBase {

    protected renderContent(property: Property, data: any, rowIndex: number): any {
        const value = this.getCustomRender(property, data, rowIndex);
        return value ?? this.renderDefault(property, data);
    }

    protected abstract renderDefault(property: Property, data: any): any;

    protected abstract getCustomRender(property: Property, data: any, rowIndex: number): any;

}

export class SimpleHeaderCellRenderer extends SimpleCellRendererBase {

    protected renderDefault(property: Property, data: any): any {
        return <th>{property.title}</th>
    }

    protected getCustomRender(property: Property, data: any, rowIndex: number): any {
        const renderer = this.getAutoCollection().getProps().properties?.renderTitle?.[property.name];
        return renderer ? renderer(property, this.getAutoCollection()) : undefined;
    }
}

export class SimpleBodyCellRenderer extends SimpleCellRendererBase {
    protected renderDefault(property: Property, data: any): any {
        return <td>{data[property.name]}</td>
    }

    protected getCustomRender(property: Property, data: any, rowIndex: number): any {
        const renderer = this.getAutoCollection().getProps().properties?.renderValue?.[property.name];
        return renderer ? renderer(property, data, {index: rowIndex}, this.getAutoCollection()) : undefined;
    }
}