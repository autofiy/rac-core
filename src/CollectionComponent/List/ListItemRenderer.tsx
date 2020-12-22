import React from "react";
import {Property} from "@autofiy/property";

export interface ListItemRenderer {
    render(properties: Property[], item: any): any;
}


export class SimpleListItemRenderer implements ListItemRenderer {

    render(properties: Property[], item: any): any {
        return <React.Fragment>
            {
                properties.map(
                    (property) =>
                        <div key={property.name}>
                            <b>{property.title}</b>
                            <span>{item[property.name]}</span>
                        </div>
                )
            }
        </React.Fragment>
    }

}