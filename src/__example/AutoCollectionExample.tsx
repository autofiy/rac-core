import React, {Component} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";
import {ListBase} from "../CollectionComponent/List/ListBase";
import {HttpDataFetcher} from "../Services/Fetcher/HttpDataFetcher";

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
                <AutoCollection as={ListBase}
                                services={{fetcher: ac => new HttpDataFetcher(ac)}}
                                extra={{
                                    dataSourceOptions: {
                                        url: 'http://localhost:9000/'
                                    }
                                }}/>
            </div>
        );
    }
}

export default AutoCollectionExample;