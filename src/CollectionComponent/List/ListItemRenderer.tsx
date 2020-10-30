import {Property} from "../../Services/PropertyServices/PropertyGenerator";
import React from "react";

export interface ListItemRenderer {
    render(properties: Property[], item: any): any;
}


export class SimpleListRenderer implements ListItemRenderer {

    render(properties: Property[], item: any): any {
        return properties.map(property => <div>
            <b>{item[property.title]} : </b>
            <span>{item[property.name]}</span>
        </div>)
    }

}