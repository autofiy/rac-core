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
import React from "react";
var BaseCollectionComponent = /** @class */ (function (_super) {
    __extends(BaseCollectionComponent, _super);
    function BaseCollectionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderWrapper = function (collectionComponent) {
            var options = _this.getRenderOptions();
            var Wrapper = options.getCollectionWrapper();
            var props = options.getWrapperProps();
            return React.createElement(Wrapper, __assign({}, props),
                _this.renderBeforeCollection(),
                collectionComponent,
                _this.renderAfterCollection());
        };
        _this.renderBeforeCollection = function () {
            var options = _this.getRenderOptions();
            var render = options.getBeforeCollectionRender();
            if (render)
                return render();
            return null;
        };
        _this.renderAfterCollection = function () {
            var options = _this.getRenderOptions();
            var render = options.getAfterCollectionRender();
            if (render)
                return render();
            return null;
        };
        return _this;
    }
    BaseCollectionComponent.prototype.render = function () {
        var collection = this.renderCollection();
        return this.renderWrapper(collection);
    };
    BaseCollectionComponent.prototype.getData = function () {
        return this.props.data;
    };
    BaseCollectionComponent.prototype.getRenderOptions = function () {
        return this.props.renderOptions;
    };
    return BaseCollectionComponent;
}(React.Component));
export { BaseCollectionComponent };
