import React, {Component} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";

class SimpleTableExample extends Component {
    render() {
        const data = [
            {id: 1, name: 'Ali Faris', year: '1993'},
            {id: 2, name: 'Huda Sajed', year: '1994'},
            {id: 3, name: 'Fatima Ali', year: '2015'},
            {id: 4, name: 'Mohammed Ali', year: '2019'},
        ];
        return (
            <AutoCollection extra={{dataSourceOptions: {data: data}}}/>
        );
    }
}

export default SimpleTableExample;