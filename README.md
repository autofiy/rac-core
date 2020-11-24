# RAC-Core (ReactAutoCollection-Core)

this library help you to write collection components easily with powerful functionalities



## Example

    import {AutoCollection , SimpleTable , HttpDataFetcher} from "rac-core"
    ...
    <AutoCollection as={SimpleTable}
                    services={{fetcher: ac => new HttpDataFetcher(ac)}}
                    extra={{dataSourceOptions: {url: 'http://localhost:9000'}}}/>


## Installation

    npm install rac-core
    //or
    yarn add rac-core