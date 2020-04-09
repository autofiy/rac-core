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
import { BaseCollectionContainer } from "./CollectionContainer";
import { IndexedKeyExtractor } from "../KeyExtractor/KeyExtractor";
import React from "react";
import { SimpleTable } from "../CollectionComponent/SimpleTable";
var SimpleTableContainer = /** @class */ (function (_super) {
    __extends(SimpleTableContainer, _super);
    function SimpleTableContainer(props) {
        var _a;
        var _this = _super.call(this, props) || this;
        _this.keyExtractor = (_a = props.keyExtractor) !== null && _a !== void 0 ? _a : new IndexedKeyExtractor();
        return _this;
    }
    SimpleTableContainer.prototype.renderCollection = function () {
        return React.createElement(SimpleTable, { data: this.state.data, keyExtractor: this.keyExtractor, renderOptions: this.props.collectionOptions });
    };
    return SimpleTableContainer;
}(BaseCollectionContainer));
export default SimpleTableContainer;
