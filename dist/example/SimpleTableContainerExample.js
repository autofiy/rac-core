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
import { IndexedKeyExtractor } from "../KeyExtractor/KeyExtractor";
import { TableRenderOptions } from "../Config/Table/TableRenderOption";
import SimpleTableContainer from "../Container/SimpleTableContainer";
import { AxiosDataSource } from "../DataSource/AxiosDataSource";
var SimpleTableContainerExample = /** @class */ (function (_super) {
    __extends(SimpleTableContainerExample, _super);
    function SimpleTableContainerExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleTableContainerExample.prototype.render = function () {
        var options = new TableRenderOptions({
            overrideColumns: {
                name: {
                    name: 'name', title: 'Nm', renderCell: function (value) { return React.createElement("td", null, String(value).toUpperCase()); }
                }
            },
            titleMap: { link: 'Action' }
        });
        return (React.createElement("div", null,
            React.createElement("h1", null, "Simple Table Container Example : "),
            React.createElement(SimpleTableContainer, { collectionOptions: options, dataSource: new AxiosDataSource({
                    url: 'https://api.npoint.io/b8cab438591b6a238751',
                    method: 'get'
                }), renderLoading: function () { return React.createElement("h1", null, "Loading..."); }, renderError: function () { return React.createElement("h1", { style: { color: 'red' } }, "Fail To Fetch Data"); }, keyExtractor: new IndexedKeyExtractor() })));
    };
    return SimpleTableContainerExample;
}(Component));
export default SimpleTableContainerExample;
