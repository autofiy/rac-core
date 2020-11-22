import React from "react";
import {SimpleListItemRenderer} from "../../../CollectionComponent/List/ListItemRenderer";
import {Property} from "../../../Services/PropertyServices/PropertyGenerator";

describe('ListItemRenderer', () => {

    it('should item', function () {
        const renderer = new SimpleListItemRenderer();
        const properties: Property[] = [
            {name: 'name', title: 'NAME'},
            {name: 'year', title: 'YEAR'},
        ];
        const item: any = {name: 'ali', year: '1993'};
        const rendered = renderer.render(properties, item);
        expect(rendered).toEqual(
            <React.Fragment>
                <div key={'name'}>
                    <b>NAME</b>
                    <span>ali</span>
                </div>
                <div key={'year'}>
                    <b>YEAR</b>
                    <span>1993</span>
                </div>
            </React.Fragment>);
    });

});