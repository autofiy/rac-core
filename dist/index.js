import React from 'react';
import ReactDOM from 'react-dom';
import SimpleTableExample from "./example/SimpleTableExample";
import SimpleTableContainerExample from "./example/SimpleTableContainerExample";
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement("div", null,
        React.createElement(SimpleTableExample, null),
        React.createElement("hr", null),
        React.createElement(SimpleTableContainerExample, null))), document.getElementById('root'));
