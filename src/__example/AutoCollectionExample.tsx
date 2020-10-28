import React, {Component} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";

class AutoCollectionExample extends Component {
    render() {
        return (
            <div>
                <AutoCollection as={'div'}/>
            </div>
        );
    }
}

export default AutoCollectionExample;