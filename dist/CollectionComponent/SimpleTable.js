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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { BaseCollectionComponent } from "./CollectionComponent";
import React from "react";
var SimpleTable = /** @class */ (function (_super) {
    __extends(SimpleTable, _super);
    function SimpleTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCollection = function () {
            var options = _this.getRenderOptions();
            var columns = options.getProperties(_this.getData());
            var className = options.getCollectionClassName();
            return (React.createElement("table", { className: className },
                _this.renderTableHeader(),
                React.createElement("tbody", null, _this.getData().map(function (value, index) { return _this.renderRow(value, index, columns); }))));
        };
        _this.renderTableHeader = function () {
            var options = _this.getRenderOptions();
            var columns = options.getProperties(_this.getData());
            var className = options.getHeaderRowClassName();
            var rowProps = options.getHeaderRowProps();
            return (React.createElement("thead", null,
                React.createElement("tr", __assign({ className: className }, rowProps), columns.map(function (column) { return _this.renderHeaderCell(column); }))));
        };
        _this.renderHeaderCell = function (column) {
            var renderFunction = column.getCustomHeaderCellRender();
            if (renderFunction)
                return (React.createElement(React.Fragment, { key: column.getName() }, renderFunction()));
            var options = _this.getRenderOptions();
            var headerCellProps = column.getHeaderCellProps();
            var headerCellClassName = column.getHeaderCellClassName() ? column.getHeaderCellClassName() : options.getHeaderCellClassName();
            return React.createElement(React.Fragment, { key: column.getName() },
                React.createElement("th", __assign({ className: headerCellClassName, key: column.getName() }, headerCellProps), column.getTitle()));
        };
        _this.renderRow = function (item, index, columns) {
            var options = _this.getRenderOptions();
            var key = _this.props.keyExtractor.getKey(index, item);
            var customRender = options.getCustomItemRender();
            if (customRender)
                return customRender(item, index, key, columns);
            var rowProps = options.getRowProps(item, index);
            var className = options.getRowClassName(item, index);
            return (React.createElement("tr", __assign({ key: key, className: className }, rowProps), columns.map(function (column) {
                var obj = item;
                var value = obj && obj[column.getName()] ? obj[column.getName()] : '';
                return _this.renderCell(value, item, index, column);
            })));
        };
        _this.renderCell = function (value, item, index, column) {
            var renderFunction = column.getCustomCellRender();
            if (renderFunction)
                return (React.createElement(React.Fragment, { key: column.getName() }, renderFunction(value, item, index)));
            var options = _this.getRenderOptions();
            var cellClassName = column.getCellClassName(item, index) ? column.getCellClassName(item, index) : options.getCellClassName(item, index);
            var cellProps = Object.keys(column.getCellProps()).length > 0 ? column.getCellProps() : options.getCellProps(item, index);
            return (React.createElement(React.Fragment, { key: column.getName() },
                React.createElement("td", __assign({ className: cellClassName }, cellProps), value)));
        };
        return _this;
    }
    return SimpleTable;
}(BaseCollectionComponent));
export { SimpleTable };
