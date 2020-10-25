import React, {Component} from 'react';
import {SimpleTable} from "../CollectionComponent/SimpleTable";
import {IndexedKeyExtractor} from "../KeyExtractor/KeyExtractor";
import {TableRenderOptions} from "../Config/Table/TableRenderOption";

class SimpleTableExample extends Component {
    render() {
        const data = [
            {id: 1, name: 'Ali Faris', age: 27},
            {id: 2, name: 'Huda Sajed', age: 26},
            {id: 3, name: 'Mohammed Ali', age: 1},
            {id: 4, name: 'Fatima Ali', age: 5},
        ];

        const options = new TableRenderOptions({
            overrideColumns: {
                age: {
                    name: 'age', title: 'Age', renderCell: value => {
                        let color: string;
                        if (value >= 12) color = 'green';
                        else if (value >= 5) color = 'yellow';
                        else color = 'red';
                        return <td style={{background: color}}>{value}</td>
                    }
                }
            }
        });

        return (
            <div>
                <h1>Simple Table Example : </h1>
                <SimpleTable data={data}
                             keyExtractor={new IndexedKeyExtractor()}
                             renderOptions={options}/>
            </div>
        );
    }
}

export default SimpleTableExample;