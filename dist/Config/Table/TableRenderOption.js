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
import { BaseCollectionRenderOptions } from "../CollectionRenderOptions";
import { Column } from "./Column";
import { ColumnOrder } from "./ColumnOrder";
var TableRenderOptions = /** @class */ (function (_super) {
    __extends(TableRenderOptions, _super);
    function TableRenderOptions(config) {
        var _this = _super.call(this, config) || this;
        _this.columns = [];
        _this.initializeColumns();
        return _this;
    }
    TableRenderOptions.prototype.initializeColumns = function () {
        if (!this.config.columns) {
            this.columns = [];
            return;
        }
        this.columns = this.config.columns.map(function (columnConfig) { return new Column(columnConfig); })
            .concat(this.getExtraColumns());
    };
    TableRenderOptions.prototype.getExtraColumns = function () {
        if (this.config.extraColumns) {
            var columns = [];
            for (var _i = 0, _a = this.config.extraColumns; _i < _a.length; _i++) {
                var extraColumn = _a[_i];
                columns.push(new Column(extraColumn));
            }
            return columns;
        }
        return [];
    };
    TableRenderOptions.prototype.getProperties = function (data) {
        var _a;
        if (this.columns.length > 0)
            return this.columns;
        var firstRow = data ? ((_a = data[0]) !== null && _a !== void 0 ? _a : {}) : {};
        var keysOfData = Object.keys(firstRow);
        return this.extractColumns(keysOfData);
    };
    TableRenderOptions.prototype.extractColumns = function (keysOfData) {
        var _a, _b;
        var nameMap = (_a = this.config.titleMap) !== null && _a !== void 0 ? _a : {};
        var overrideColumns = (_b = this.config.overrideColumns) !== null && _b !== void 0 ? _b : {};
        var columns = [];
        keysOfData.forEach(function (key) {
            var _a;
            if (overrideColumns[key]) {
                columns.push(new Column(overrideColumns[key]));
                return;
            }
            var title = (_a = nameMap[key]) !== null && _a !== void 0 ? _a : key;
            columns.push(new Column({ name: key, title: title }));
        });
        var allColumns = columns.concat(this.getExtraColumns());
        return new ColumnOrder(allColumns, this.config.orderBy).order();
    };
    TableRenderOptions.prototype.getHeaderRowClassName = function () {
        var _a;
        return (_a = this.config.headerRowClassName) !== null && _a !== void 0 ? _a : '';
    };
    TableRenderOptions.prototype.getHeaderRowProps = function () {
        var _a;
        return (_a = this.config.headerRowProps) !== null && _a !== void 0 ? _a : {};
    };
    TableRenderOptions.prototype.getRowClassName = function (item, index) {
        if (typeof this.config.rowClassName === "function")
            return this.config.rowClassName(item, index);
        if (typeof this.config.rowClassName === "string")
            return this.config.rowClassName;
        return '';
    };
    // noinspection JSUnusedLocalSymbols
    TableRenderOptions.prototype.getRowProps = function (item, index) {
        var _a;
        return (_a = this.config.rowProps) !== null && _a !== void 0 ? _a : {};
    };
    TableRenderOptions.prototype.getCellClassName = function (item, index) {
        if (typeof this.config.cellClassName === "function")
            return this.config.cellClassName(item, index);
        if (typeof this.config.cellClassName === "string")
            return this.config.cellClassName;
        return '';
    };
    // noinspection JSUnusedLocalSymbols
    TableRenderOptions.prototype.getCellProps = function (item, index) {
        var _a;
        return (_a = this.config.cellProps) !== null && _a !== void 0 ? _a : {};
    };
    TableRenderOptions.prototype.getHeaderCellClassName = function () {
        var _a;
        return (_a = this.config.headerCellClassName) !== null && _a !== void 0 ? _a : '';
    };
    TableRenderOptions.prototype.getHeaderCellProps = function () {
        var _a;
        return (_a = this.config.headerCellProps) !== null && _a !== void 0 ? _a : {};
    };
    return TableRenderOptions;
}(BaseCollectionRenderOptions));
export { TableRenderOptions };
