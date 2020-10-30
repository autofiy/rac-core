import React, {Component} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";
import {TableBase} from "../CollectionComponent/Table/TableBase";
import {ListBase} from "../CollectionComponent/List/ListBase";

class AutoCollectionExample extends Component {
    render() {
        const data = [
            {id: 1, name: 'Ali Faris 1', phone: '07808130427'},
            {id: 2, name: 'Ali Faris 2', phone: '17808130427'},
            {id: 3, name: 'Ali Faris 3', phone: '27808130427'},
            {id: 4, name: 'Ali Faris 4', phone: '37808130427'},
            {id: 5, name: 'Ali Faris 5', phone: '47808130427'},
        ];
        return (
            <div>
                <AutoCollection as={ListBase} extra={{
                    dataSourceOptions: {data: data}
                }}/>
            </div>
        );
    }
}

export default AutoCollectionExample;