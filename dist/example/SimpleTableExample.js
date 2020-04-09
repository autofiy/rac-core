var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import { SimpleTable } from "../CollectionComponent/SimpleTable";
import { IndexedKeyExtractor } from "../KeyExtractor/KeyExtractor";
import { TableRenderOptions } from "../Config/Table/TableRenderOption";
var SimpleTableExample = /** @class */ (function (_super) {
    __extends(SimpleTableExample, _super);
    function SimpleTableExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleTableExample.prototype.render = function () {
        var data = [
            { id: 1, name: 'Ali Faris', age: 27 },
            { id: 2, name: 'Huda Sajed', age: 26 },
            { id: 3, name: 'Mohammed Ali', age: 1 },
            { id: 4, name: 'Fatima Ali', age: 5 },
        ];
        var options = new TableRenderOptions({
            overrideColumns: {
                age: {
                    name: 'age', title: 'Age', renderCell: function (value) {
                        var color;
                        if (value >= 12)
                            color = 'green';
                        else if (value >= 5)
                            color = 'yellow';
                        else
                            color = 'red';
                        return React.createElement("td", { style: { background: color } }, value);
                    }
                }
            }
        });
        return (React.createElement("div", null,
            React.createElement("h1", null, "Simple Table Example : "),
            React.createElement(SimpleTable, { data: data, keyExtractor: new IndexedKeyExtractor(), renderOptions: options })));
    };
    return SimpleTableExample;
}(Component));
export default SimpleTableExample;
