import {unmountComponentAtNode} from "react-dom";
import waitUntil from "async-wait-until";
import SimpleTableContainer from "../../Container/SimpleTableContainer";
import {AxiosDataSource} from "../../DataSource/AxiosDataSource";
import AxiosMockAdapter from "axios-mock-adapter";
import Axios from "axios";
import {TableRenderOptions} from "../../Config/Table/TableRenderOption";
import React from "react";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {IndexedKeyExtractor} from "../../KeyExtractor/KeyExtractor";

configure({adapter: new Adapter()});

// noinspection DuplicatedCode
describe('Simple Table Container', () => {

    let container: Element | null = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container!);
        container!.remove();
        container = null;
    });

    it('should use IndexedKeyExtractor', function () {
        const root = shallow(<SimpleTableContainer collectionOptions={new TableRenderOptions({})}
                                                   dataSource={new AxiosDataSource({
                                                       url: '/test',
                                                       method: 'get'
                                                   })}/>);
        expect((root.instance() as any).keyExtractor).toBeInstanceOf(IndexedKeyExtractor);
    });

    it('should fetch data', async () => {

        const data = [{id: 1, name: 'Ali'}, {id: 2, name: 'Huda'}];
        const axiosMock = new AxiosMockAdapter(Axios);
        axiosMock.onGet('/test').reply(200, data);

        const root: any = mount(<SimpleTableContainer collectionOptions={new TableRenderOptions({})}
                                                      dataSource={new AxiosDataSource({
                                                          url: '/test',
                                                          method: 'get'
                                                      })}/>);

        expect(root.state('loading')).toEqual(true);
        await waitUntil(() => root.state('data').length !== 0);
        expect(root.state('data')).toEqual(data);
        expect(root.state('loading')).toEqual(false);
        expect(root.state('error')).toEqual(null);
    });


    it('should fail fetch data', async () => {

        const axiosMock = new AxiosMockAdapter(Axios);
        axiosMock.onGet('/test').networkError();

        const root: any = mount(<SimpleTableContainer collectionOptions={new TableRenderOptions({})}
                                                      dataSource={new AxiosDataSource({
                                                          url: '/test',
                                                          method: 'get'
                                                      })}/>);

        expect(root.state('loading')).toEqual(true);
        await waitUntil(() => root.state('error') !== null);
        expect(root.state('data')).toEqual([]);
        expect(root.state('loading')).toEqual(false);
        expect(root.state('error')).not.toEqual(null);
    });


    it('should use custom loading/error renderer', async () => {

        const renderError = jest.fn().mockReturnValue(null);
        const renderLoading = jest.fn().mockReturnValue(null);
        const axiosMock = new AxiosMockAdapter(Axios);
        axiosMock.onGet('/test').networkError();
        const root: any = mount(<SimpleTableContainer collectionOptions={new TableRenderOptions({})}
                                                      renderError={renderError}
                                                      renderLoading={renderLoading}
                                                      dataSource={new AxiosDataSource({
                                                          url: '/test',
                                                          method: 'get'
                                                      })}/>);

        expect(root.state('loading')).toEqual(true);
        expect(renderLoading).toBeCalledTimes(2);
        await waitUntil(() => root.state('error') !== null);
        expect(renderError).toBeCalledTimes(1);
    });


    it('should use custom empty render', async () => {
        const renderEmpty = jest.fn().mockReturnValue(null);
        const axiosMock = new AxiosMockAdapter(Axios);
        axiosMock.onGet('/test').reply(200, []);
        const root: any = mount(<SimpleTableContainer collectionOptions={new TableRenderOptions({})}
                                                      renderEmpty={renderEmpty}
                                                      dataSource={new AxiosDataSource({
                                                          url: '/test',
                                                          method: 'get'
                                                      })}/>);

        await waitUntil(() => root.state('loading') !== true);
        expect(renderEmpty).toBeCalledTimes(1);
    });

});