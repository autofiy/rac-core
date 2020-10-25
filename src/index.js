import React from 'react';
import ReactDOM from 'react-dom';
import SimpleTableExample from "./old/example/SimpleTableExample";
import SimpleTableContainerExample from "./old/example/SimpleTableContainerExample";


ReactDOM.render(
    <React.StrictMode>
        <div>
            <SimpleTableExample/>
            <hr/>
            <SimpleTableContainerExample/>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);