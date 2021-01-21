import React, {useState} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";
import {SimpleTable} from "../CollectionComponent/Table/SimpleTable";
import {HttpDataFetcher} from "../Services/Fetcher/HttpDataFetcher";

function RefetchOnDataOnDataSourceChanged() {
    const [value, setValue] = useState('');
    const [dataSource, setDataSource] = useState({url: `http://localhost:9000/heavy-process`});
    return (
        <div>
            <AutoCollection as={SimpleTable}
                            services={{fetcher: autofiyable => new HttpDataFetcher(autofiyable)}}
                            extra={{dataSourceOptions: dataSource}}/>
            <input value={value} onChange={e => setValue(e.target.value)} placeholder={'Query'}/>
            <button onClick={() => {
                setDataSource({url: `http://localhost:9000/heavy-process?query=${encodeURI(value)}`});
            }}>
                SEARCH
            </button>
        </div>
    );
}

export default RefetchOnDataOnDataSourceChanged;