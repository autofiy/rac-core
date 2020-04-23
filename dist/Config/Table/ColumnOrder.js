var ColumnOrder = /** @class */ (function () {
    function ColumnOrder(columns, orderBy) {
        this.columns = columns;
        this.orderBy = orderBy;
    }
    ColumnOrder.prototype.order = function () {
        var orderByArray = this.getOrderByArray();
        var orderedColumns = [];
        for (var _i = 0, orderByArray_1 = orderByArray; _i < orderByArray_1.length; _i++) {
            var columnName = orderByArray_1[_i];
            orderedColumns.push(this.getColumnByName(columnName));
        }
        return orderedColumns;
    };
    ColumnOrder.prototype.getColumnByName = function (name) {
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (column.getName() === name) {
                return column;
            }
        }
        throw Error("Cannot find column " + name);
    };
    ColumnOrder.prototype.getOrderByArray = function () {
        var order = this.orderBy;
        if (Array.isArray(order))
            return order;
        else if (typeof order === "function")
            return order(this.columns);
        return this.columns.map(function (col) { return String(col.getName()); });
    };
    return ColumnOrder;
}());
export { ColumnOrder };
