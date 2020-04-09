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
import { SimpleProperty } from "../CollectionRenderOptions";
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Column.prototype.getCustomHeaderCellRender = function () {
        return this.config.renderHeaderCell;
    };
    Column.prototype.getCustomCellRender = function () {
        return this.config.renderCell;
    };
    Column.prototype.getHeaderCellProps = function () {
        var _a;
        return (_a = this.config.headerCellProps) !== null && _a !== void 0 ? _a : {};
    };
    Column.prototype.getCellProps = function () {
        var _a;
        return (_a = this.config.cellProps) !== null && _a !== void 0 ? _a : {};
    };
    Column.prototype.getHeaderCellClassName = function () {
        var _a;
        return (_a = this.config.headerCellClassName) !== null && _a !== void 0 ? _a : '';
    };
    Column.prototype.getCellClassName = function (item, index) {
        if (typeof this.config.cellClassName === "function")
            return this.config.cellClassName(item, index);
        if (typeof this.config.cellClassName === "string")
            return this.config.cellClassName;
        return '';
    };
    return Column;
}(SimpleProperty));
export { Column };
