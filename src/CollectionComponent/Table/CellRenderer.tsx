import React from "react";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {Property} from "@autofiy/property";

export interface CellRenderer {
    render(property: Property, data: any): any;
}

export abstract class CellRendererBase implements CellRenderer {

    private readonly autoCollection: IAutoCollection;

    constructor(autoCollection: IAutoCollection) {
        this.autoCollection = autoCollection;
    }

    render(property: Property, data: any): any {
        return <React.Fragment key={property.name}>
            {
                this.renderContent(property, data)
            }
        </React.Fragment>
    }

    protected getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

    protected abstract renderContent(property: Property, data: any): any;

}

export abstract class SimpleCellRendererBase extends CellRendererBase {

    protected renderContent(property: Property, data: any): any {
        const render = this.getCustomRender(property);
        if (render) {
            return render(property, data, this.getAutoCollection());
        }
        return this.renderDefault(property, data);
    }

    protected abstract renderDefault(property: Property, data: any): any;

    protected abstract getCustomRender(property: Property): any;

}

export class SimpleHeaderCellRenderer extends SimpleCellRendererBase {

    protected renderDefault(property: Property, data: any): any {
        return <th>{property.title}</th>
    }

    protected getCustomRender(property: Property): any {
        return this.getAutoCollection().getProps().properties?.renderTitle?.[property.name];
    }
}

export class SimpleBodyCellRenderer extends SimpleCellRendererBase {
    protected renderDefault(property: Property, data: any): any {
        return <td>{data[property.name]}</td>
    }


    protected getCustomRender(property: Property): any {
        return this.getAutoCollection().getProps().properties?.renderValue?.[property.name];
    }
}