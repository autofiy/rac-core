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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from "react";
var BaseCollectionContainer = /** @class */ (function (_super) {
    __extends(BaseCollectionContainer, _super);
    function BaseCollectionContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.appendItemAt = function (index, item) {
            var data = __spreadArrays(_this.state.data);
            data.splice(index, 0, item);
            _this.setState({ data: data });
        };
        _this.appendItemFirst = function (item) {
            _this.appendItemAt(0, item);
        };
        _this.appendItemLast = function (item) {
            var data = __spreadArrays(_this.state.data);
            data.push(item);
            _this.setState({ data: data });
        };
        _this.removeAt = function (index) {
            var data = __spreadArrays(_this.state.data);
            data.splice(index, 1);
            _this.setState({ data: data });
        };
        _this.updateItem = function (index, item) {
            var data = __spreadArrays(_this.state.data);
            data[index] = item;
            _this.setState({ data: data });
        };
        _this.state = { data: [], error: null, loading: true };
        return _this;
    }
    BaseCollectionContainer.prototype.componentDidMount = function () {
        if (this.props.onFetchStart)
            this.props.onFetchStart();
        this.startDataFetch();
    };
    BaseCollectionContainer.prototype.startDataFetch = function () {
        var _this = this;
        var dataSource = this.props.dataSource;
        this.setState({ loading: true, error: false });
        dataSource.getData()
            .then(function (data) {
            _this.setState({ loading: false, error: null, data: data });
            if (_this.props.onFetchDone)
                _this.props.onFetchDone(data);
        })
            .catch(function (e) {
            _this.setState({ loading: false, error: e, data: [] });
            if (_this.props.onFetchFail)
                _this.props.onFetchFail(e);
        });
    };
    BaseCollectionContainer.prototype.render = function () {
        if (this.state.loading)
            return this.renderLoading();
        if (this.state.error)
            return this.renderError(this.state.error);
        if (this.state.data.length === 0 && !this.state.loading)
            return this.renderEmpty();
        return this.renderCollection();
    };
    BaseCollectionContainer.prototype.renderEmpty = function () {
        if (this.props.renderEmpty)
            return this.props.renderEmpty();
        return null;
    };
    BaseCollectionContainer.prototype.renderError = function (e) {
        if (this.props.renderError)
            return this.props.renderError(e);
        return null;
    };
    BaseCollectionContainer.prototype.renderLoading = function () {
        if (this.props.renderLoading)
            return this.props.renderLoading();
        return null;
    };
    BaseCollectionContainer.prototype.getData = function () {
        return this.state.data;
    };
    return BaseCollectionContainer;
}(React.Component));
export { BaseCollectionContainer };
