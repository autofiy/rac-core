import {AxiosDataSource} from "../../DataSource/AxiosDataSource";
import AxiosMockAdapter from "axios-mock-adapter";
import Axios from "axios";

describe('AxiosDataSource', () => {

    it('should fetch data using get request', function (done) {
        const data = [
            {id: 1, name: 'Ali'},
            {id: 2, name: 'Huda'},
        ];
        const ds = new AxiosDataSource({
            method: 'get', url: '/some-url', config: {
                headers: {'SecretKey': 'SOMEXXXKEY'}
            }
        });
        const axiosMock = new AxiosMockAdapter(Axios);
        axiosMock.onGet('/some-url').reply(config => {
            expect(config.headers['SecretKey']).toEqual('SOMEXXXKEY');
            return [200, data];
        });

        ds.getData().then(data => {
            expect(data).toEqual(data);
            done();
        });

    });


    it('should fetch data using post request', function (done) {
        const data = [
            {id: 1, name: 'Ali'},
            {id: 2, name: 'Huda'},
        ];
        const ds = new AxiosDataSource({
            method: 'post', url: '/some-url', config: {
                headers: {'SecretKey': 'SOMEXXXKEY'}
            }
        });
        const axiosMock = new AxiosMockAdapter(Axios);
        axiosMock.onPost('/some-url').reply(config => {
            expect(config.headers['SecretKey']).toEqual('SOMEXXXKEY');
            return [200, data];
        });

        ds.getData().then(data => {
            expect(data).toEqual(data);
            done();
        });
    });

    it('should handle failed network request', function (done) {
        const ds = new AxiosDataSource({
            method: 'get', url: '/some-url', config: {
                headers: {'SecretKey': 'SOMEXXXKEY'}
            }
        });
        const axiosMock = new AxiosMockAdapter(Axios);
        axiosMock.onGet('/some-url').networkError();
        ds.getData().catch(() => done());
    });

    it('should throw error when request neither get nor post', function (done) {
        const ds = new AxiosDataSource({
            method: 'put' as any, url: '/some-url', config: {
                headers: {'SecretKey': 'SOMEXXXKEY'}
            }
        });

        ds.getData().catch(e => {
            expect(e.message).toEqual('Method put is not supported');
            done();
        });
    });

    it('should use custom extract data', function (done) {
        const data = [
            {id: 1, name: 'Ali'},
            {id: 2, name: 'Huda'},
        ];
        const ds = new AxiosDataSource({
            method: 'get', url: '/some-url', config: {
                headers: {'SecretKey': 'SOMEXXXKEY'}
            },
            extractDataFromResponse: (response => response.data.data)
        });
        const axiosMock = new AxiosMockAdapter(Axios);
        axiosMock.onGet('/some-url').reply(config => {
            expect(config.headers['SecretKey']).toEqual('SOMEXXXKEY');
            return [200, {
                data: data
            }];
        });

        ds.getData().then(data => {
            expect(data).toEqual(data);
            done();
        });
    });

});