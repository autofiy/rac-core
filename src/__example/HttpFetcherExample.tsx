import React, {Component} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";

class HttpFetcherExample extends Component {
    render() {
        return (
            <AutoCollection extra={{dataSourceOptions: {url: 'http://localhost:9000'}}}/>
        );
    }
}

export default HttpFetcherExample;