var SimpleDataSource = /** @class */ (function () {
    function SimpleDataSource(data) {
        this.data = data;
    }
    SimpleDataSource.prototype.getData = function (options) {
        var _this = this;
        return new Promise(function (resolve) { return resolve(_this.data); });
    };
    SimpleDataSource.prototype.getOptions = function () {
        return {};
    };
    return SimpleDataSource;
}());
export { SimpleDataSource };
