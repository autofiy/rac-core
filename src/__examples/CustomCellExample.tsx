import React, {Component} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";
import {DirectDataFetcher} from "../Services/Fetcher/DirectDataFetcher";
import {SimpleTable} from "../CollectionComponent/Table/SimpleTable";

class CustomCellExample extends Component {
    render() {
        const data = [
            {id: 1, name: 'Ali Faris', year: '1993'},
            {id: 2, name: 'Huda Sajed', year: '1994'},
            {id: 3, name: 'Fatima Ali', year: '2015'},
            {id: 4, name: 'Mohammed Ali', year: '2019'},
        ];
        return (
            <AutoCollection as={SimpleTable}
                            services={{fetcher: ac => new DirectDataFetcher(ac)}}
                            properties={{
                                renderValue: {
                                    id: (_, data) => <td style={{background: 'red', color: 'white'}}>{data.id}</td>
                                },
                                renderTitle: {
                                    id: () => <th style={{background: 'blue', color: 'white'}}>#</th>
                                }
                            }}
                            extra={{dataSourceOptions: {data: data}}}/>
        );
    }
}

export default CustomCellExample;