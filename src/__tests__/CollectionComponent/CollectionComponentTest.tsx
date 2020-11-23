import {configure, mount} from "enzyme";
import {CollectionComponentBase} from "../../CollectionComponent/CollectionComponent";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import {mock} from "jest-mock-extended";
import {Property, PropertyGenerator} from "../../Services/PropertyServices/PropertyGenerator";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {DataManager} from "../../Services/DataManager/DataManager";

configure({adapter: new Adapter()});

describe('CollectionComponent', () => {

    it('should return data', function () {
        const data = [{}, {}];
        const generator = mock<PropertyGenerator>();
        const ac = mock<IAutoCollection>({
            data(): DataManager {
                return mock<DataManager>({
                    get(): any {
                        return data;
                    }
                })
            }
        });
        const component = mount(<CollectionComponentBase propertyGenerator={generator} autoCollection={ac}/>);
        const instance = component.instance() as CollectionComponentBase;
        expect(instance.getData()).toEqual(data);
    });

    it('should return auto collection instance', function () {
        const generator = mock<PropertyGenerator>();
        const ac = mock<IAutoCollection>();
        const component = mount(<CollectionComponentBase propertyGenerator={generator} autoCollection={ac}/>);
        const instance = component.instance() as CollectionComponentBase;
        expect(instance.getAutoCollection()).toBe(ac);
    });

    it('should generate properties lazily', function () {
        const properties = [{name: 'test', title: 'TEST'}];
        const generator = mock<PropertyGenerator>({
            generate(): Property[] {
                return properties;
            }
        });
        const ac = mock<IAutoCollection>();
        const component = mount(<CollectionComponentBase propertyGenerator={generator} autoCollection={ac}/>);
        const instance = component.instance() as CollectionComponentBase;
        const generatedProperties = instance.getProperties();
        expect(generatedProperties).toEqual(properties);
    });

    it('should generate properties when ever the properties are empty array', function () {
        const properties = [{name: 'test', title: 'TEST'}];
        let firstTime = true;
        const generator = mock<PropertyGenerator>({
            generate(): Property[] {
                if (firstTime) {
                    firstTime = false;
                    return [];
                }
                return properties;
            }
        });
        const ac = mock<IAutoCollection>();
        const component = mount(<CollectionComponentBase propertyGenerator={generator} autoCollection={ac}/>);
        const instance = component.instance() as CollectionComponentBase;
        let generatedProperties = instance.getProperties();
        expect(generatedProperties).toEqual([]);
        generatedProperties = instance.getProperties();
        expect(generatedProperties).toEqual(properties);
    });
});