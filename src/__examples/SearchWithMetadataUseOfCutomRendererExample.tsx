import React, {useEffect, useRef, useState} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";
import {SimpleTable} from "../CollectionComponent/Table/SimpleTable";

function SearchWithMetadataUseOfCutomRendererExample() {
    const autoCollectionRef = useRef<AutoCollection>(null);
    const [value, setValue] = useState('');
    const [url, setUrl] = useState('http://localhost:9000/all');

    useEffect(() => {
        autoCollectionRef.current?.refreshData();
    }, [url])
    return (
        <div>
            <input value={value} onChange={e => setValue(e.target.value)}/>
            <button onClick={() => {
                setUrl('http://localhost:9000/search');
            }}>Search
            </button>
            <AutoCollection ref={autoCollectionRef} as={SimpleTable}
                            properties={{
                                renderValue: {
                                    name: (p, {name}, {index}) => <td>{index} - {name}</td>
                                }
                            }}
                            extra={{
                                dataSourceOptions: {url: url}
                            }}/>
        </div>
    );
}

export default SearchWithMetadataUseOfCutomRendererExample;