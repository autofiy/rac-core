import {SimpleHeaderCellRenderer} from "../../../CollectionComponent/Table/CellRenderer";
import {mock} from "jest-mock-extended";
import {IAutoCollection} from "../../../AutoCollection/IAutoCollection";
import {Property} from "../../../Services/PropertyServices/PropertyGenerator";
import React from "react";

describe('SimpleHeaderCellRenderer', () => {

    it('should render header cell', function () {
        const autoCollection = mock<IAutoCollection>({getProps: () => ({} as any)});
        const renderer = new SimpleHeaderCellRenderer(autoCollection);
        const property: Property = {name: 'name', title: 'THE NAME'};
        const data: any = {name: 'Ali Faris', phone: '-'};
        const rendered = renderer.render(property, data);
        const expected = <React.Fragment key={'name'}>
            <th>THE NAME</th>
        </React.Fragment>;
        expect(expected).toEqual(rendered);
    });

    it('should custom render header', function () {
        const customRender = jest.fn().mockReturnValue('custom render');
        const autoCollection = mock<IAutoCollection>({
            getProps: () => ({
                properties: {
                    headerRender: {
                        name: customRender
                    }
                }
            } as any)
        });
        const renderer = new SimpleHeaderCellRenderer(autoCollection);
        const property: Property = {name: 'name', title: 'THE NAME'};
        const data: any = {name: 'Ali Faris', phone: '-'};
        const rendered = renderer.render(property, data);
        const expected = <React.Fragment key={'name'}>
            custom render
        </React.Fragment>;
        expect(expected).toEqual(rendered);
        expect(customRender).toBeCalledWith(property, data, autoCollection);
    });

});
