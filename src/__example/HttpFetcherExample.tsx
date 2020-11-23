import React, {Component} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";
import {SimpleTable} from "../CollectionComponent/Table/SimpleTable";
import {HttpDataFetcher} from "../Services/Fetcher/HttpDataFetcher";

class HttpFetcherExample extends Component {
    render() {
        return (
            <AutoCollection as={SimpleTable}
                            services={{fetcher: ac => new HttpDataFetcher(ac)}}
                            extra={{dataSourceOptions: {url: 'http://localhost:9000'}}}/>
        );
    }
}

export default HttpFetcherExample;