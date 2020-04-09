var IndexedKeyExtractor = /** @class */ (function () {
    function IndexedKeyExtractor() {
    }
    IndexedKeyExtractor.prototype.getKey = function (index, item) {
        return index;
    };
    return IndexedKeyExtractor;
}());
export { IndexedKeyExtractor };
var PropertyKeyExtractor = /** @class */ (function () {
    function PropertyKeyExtractor(key) {
        this.key = key;
    }
    PropertyKeyExtractor.prototype.getKey = function (index, item) {
        return item[this.key];
    };
    return PropertyKeyExtractor;
}());
export { PropertyKeyExtractor };
