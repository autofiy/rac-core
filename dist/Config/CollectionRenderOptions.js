import React from "react";
var SimpleProperty = /** @class */ (function () {
    function SimpleProperty(config) {
        this.config = config;
    }
    SimpleProperty.prototype.getName = function () {
        return this.config.name;
    };
    SimpleProperty.prototype.getTitle = function () {
        return this.config.title;
    };
    return SimpleProperty;
}());
export { SimpleProperty };
var BaseCollectionRenderOptions = /** @class */ (function () {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    function BaseCollectionRenderOptions(config) {
        this.config = config;
    }
    BaseCollectionRenderOptions.prototype.getCollectionClassName = function () {
        var _a;
        return (_a = this.config.collectionClassName) !== null && _a !== void 0 ? _a : '';
    };
    BaseCollectionRenderOptions.prototype.getCollectionProps = function () {
        var _a;
        return (_a = this.config.collectionProps) !== null && _a !== void 0 ? _a : {};
    };
    BaseCollectionRenderOptions.prototype.getCollectionWrapper = function () {
        var _a;
        return (_a = this.config.wrapper) !== null && _a !== void 0 ? _a : React.Fragment;
    };
    BaseCollectionRenderOptions.prototype.getWrapperProps = function () {
        var _a;
        return (_a = this.config.wrapperProps) !== null && _a !== void 0 ? _a : {};
    };
    BaseCollectionRenderOptions.prototype.getCustomItemRender = function () {
        return this.config.renderItem;
    };
    BaseCollectionRenderOptions.prototype.getBeforeCollectionRender = function () {
        return this.config.renderBeforeCollection;
    };
    BaseCollectionRenderOptions.prototype.getAfterCollectionRender = function () {
        return this.config.renderAfterCollection;
    };
    return BaseCollectionRenderOptions;
}());
export { BaseCollectionRenderOptions };
