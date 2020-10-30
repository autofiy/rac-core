import {Property} from "../../Services/PropertyServices/PropertyGenerator";
import React from "react";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";

export interface CellRenderer {
    render(property: Property, data: any): any;
}

export abstract class CellRendererBase implements CellRenderer {

    private readonly autoCollection: IAutoCollection;

    constructor(autoCollection: IAutoCollection) {
        this.autoCollection = autoCollection;
    }

    protected getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

    render(property: Property, data: any): any {
        return <React.Fragment key={property.name}>
            {
                this.renderContent(property, data)
            }
        </React.Fragment>
    }

    abstract renderContent(property: Property, data: any): any;

}

export abstract class SimpleCellRendererBase extends CellRendererBase {

    renderContent(property: Property, data: any): any {
        const render = this.getAutoCollection().getProps().properties?.render?.[property.name];
        if (render) {
            return render(property, this.getAutoCollection());
        }
        return this.renderDefault(property, data);
    }

    protected abstract renderDefault(property: Property, data: any): any;

}


export class SimpleHeaderCellRenderer extends SimpleCellRendererBase {

    protected renderDefault(property: Property, data: any): any {
        return <th>{property.title}</th>
    }
}

export class SimpleBodyCellRenderer extends SimpleCellRendererBase {
    protected renderDefault(property: Property, data: any): any {
        return <td>{data[property.name]}</td>
    }
}