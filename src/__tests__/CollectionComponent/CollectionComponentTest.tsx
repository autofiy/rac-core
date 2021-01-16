import {configure, mount} from "enzyme";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {mock} from "jest-mock-extended";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {DataManager} from "../../Services/DataManager/DataManager";
import {CollectionComponentBase} from "../../CollectionComponent/CollectionComponent";

configure({adapter: new Adapter()});

describe('CollectionComponent', () => {

    it('should return data', function () {
        const data = [{}, {}];
        const ac = mock<IAutoCollection>({
            data(): DataManager {
                return mock<DataManager>({
                    get(): any {
                        return data;
                    }
                })
            }
        });
        const component = mount(<CollectionComponentBase properties={[]} autoCollection={ac}/>);
        const instance = component.instance() as CollectionComponentBase;
        expect(instance.getData()).toEqual(data);
    });

    it('should return auto collection instance', function () {

        const ac = mock<IAutoCollection>();
        const component = mount(<CollectionComponentBase properties={[]} autoCollection={ac}/>);
        const instance = component.instance() as CollectionComponentBase;
        expect(instance.getAutoCollection()).toBe(ac);
    });

    it('should generate properties lazily', function () {
        const properties = [{name: 'test', title: 'TEST'}];
        const ac = mock<IAutoCollection>({
            data(): DataManager {
                return mock<DataManager>();
            }
        });
        const component = mount(<CollectionComponentBase properties={properties} autoCollection={ac}/>);
        const instance = component.instance() as CollectionComponentBase;
        const generatedProperties = instance.getProperties();
        expect(generatedProperties).toEqual(properties);
    });
});