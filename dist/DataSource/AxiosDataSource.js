import Axios from "axios";
var AxiosDataSource = /** @class */ (function () {
    function AxiosDataSource(options) {
        this.options = options;
    }
    AxiosDataSource.prototype.getData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.options.url;
            var axiosDataRequest = _this.options.axiosDataRequest;
            var axiosRequestConfig = _this.options.config;
            _this.getPromise(url, axiosDataRequest, axiosRequestConfig)
                .then(function (response) { return setTimeout(function () { return resolve(_this.getDataFromResponse(response)); }, 2000); })
                .catch(function (e) { return reject(e); });
        });
    };
    AxiosDataSource.prototype.getPromise = function (url, axiosDataRequest, axiosConfig) {
        var options = this.getOptions();
        if (options.method === "get")
            return Axios.get(options.url, options.config);
        else if (options.method === "post")
            return Axios.post(url, axiosDataRequest, axiosConfig);
        throw new Error("Method " + options.method + " is not supported");
    };
    AxiosDataSource.prototype.getOptions = function () {
        return this.options;
    };
    AxiosDataSource.prototype.getDataFromResponse = function (response) {
        var extractDataFromResponse = this.getOptions().extractDataFromResponse;
        if (extractDataFromResponse) {
            return extractDataFromResponse(response);
        }
        return response.data;
    };
    return AxiosDataSource;
}());
export { AxiosDataSource };
