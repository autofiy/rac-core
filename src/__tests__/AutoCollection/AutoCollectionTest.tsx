import {configure, mount} from "enzyme";
import {AutoCollection} from "../../AutoCollection/AutoCollection";
import {DataFetcher} from "../../Services/Fetcher/DataFetcher";
import {mock} from "jest-mock-extended";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import {EmptyComponent} from "../../CollectionComponent/CollectionComponent";

configure({adapter: new Adapter()});


describe('AutoCollectionTest', () => {

    it('should fetch data on mount', function () {
        const fetcher = mock<DataFetcher<any>>();
        mount(<AutoCollection as={EmptyComponent} services={{fetcher: _ => fetcher}}/>);
        expect(fetcher.fetch).toBeCalledTimes(1);
    });


    it('should refresh data when not loading', function () {
        const fetcher = mock<DataFetcher<any>>();
        const component = mount(<AutoCollection as={EmptyComponent} services={{fetcher: _ => fetcher}}/>);
        const instance = component.instance() as AutoCollection;
        (instance.state as any).loading = false;
        instance.refreshData();
        expect(fetcher.fetch).toBeCalledTimes(2);
    });

    it('should not refresh data when loading', function () {
        const fetcher = mock<DataFetcher<any>>();
        const component = mount(<AutoCollection as={EmptyComponent} services={{fetcher: _ => fetcher}}/>);
        const instance = component.instance() as AutoCollection;
        (instance.state as any).loading = true;
        instance.refreshData();
        expect(fetcher.fetch).toBeCalledTimes(1);
    });

});