import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {SimpleTable} from "../../CollectionComponent/SimpleTable";
import {IndexedKeyExtractor} from "../../KeyExtractor/KeyExtractor";
import {TableRenderOptions} from "../../Config/Table/TableRenderOption";
import React from "react";

describe('SimpleTable', () => {

    let container: Element | null = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container!);
        container!.remove();
        container = null;
    });


    it('should match snapshot', function () {
        act(() => {
            render(<SimpleTable data={[{id: 1, name: 'Ali'}]}
                                keyExtractor={new IndexedKeyExtractor()}
                                renderOptions={new TableRenderOptions({})}/>, container)
        });
        expect(container?.innerHTML).toMatchSnapshot();
    });


    it('should use custom options for column', function () {

        const onClick = jest.fn();
        const data = [{id: 1, name: 'Ali'}];
        const options = new TableRenderOptions({
            overrideColumns: {
                name: {
                    name: 'name', title: 'The Name',
                    renderHeaderCell: () => <th>Custom Name</th>,
                    renderCell: (value: any) => <td>
                        <button onClick={onClick}>{value}</button>
                    </td>
                }
            }
        });

        // noinspection DuplicatedCode
        act(() => {
            render(<SimpleTable data={data}
                                keyExtractor={new IndexedKeyExtractor()}
                                renderOptions={options}/>, container)
        });

        const cell = container!.querySelector('table tbody tr:nth-child(1) td:nth-child(2)');
        expect(cell).toBeTruthy();
        const button = cell!.querySelector('button');
        expect(button).toBeTruthy();
        expect(button!.textContent).toEqual('Ali');
        button!.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(onClick).toBeCalledTimes(1);

        const headerCell = container!.querySelector('table thead tr:nth-child(1) th:nth-child(2)');
        expect(headerCell).toBeTruthy();
        expect(headerCell!.textContent).toEqual('Custom Name');
    });


    it('should use custom item render', function () {
        const options = new TableRenderOptions({
            renderItem: (item: any, index: number, key: any) => <tr key={key}>
                <td>{item.id}</td>
                <td><b>{item.name}</b></td>
            </tr>
        });

        act(() => {
            render(<SimpleTable data={[{id: 1, name: 'Test'}]}
                                keyExtractor={new IndexedKeyExtractor()}
                                renderOptions={options}/>, container)
        });

        const element = container!.querySelector('table tbody tr:nth-child(1) td:nth-child(2) b');
        expect(element).toBeTruthy();
        expect(element!.textContent).toEqual('Test');
    });


});