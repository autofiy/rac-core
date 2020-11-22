import {SimpleList} from "../../../CollectionComponent/List/SimpleList";
import {mock} from "jest-mock-extended";
import {DataManager} from "../../../Services/DataManager/DataManager";
import {IAutoCollection} from "../../../AutoCollection/IAutoCollection";
import {SmartPropertyGenerator} from "../../../Services/PropertyServices/PropertyGenerator";
import React from "react";

describe('SimpleList', () => {
    it('should render list', function () {
        const data = [
            {name: 'ali', year: '1993'},
            {name: 'huda', year: '1994'},
        ]
        const mockedData = mock<DataManager>({
            get: () => data
        });
        const autoCollection = mock<IAutoCollection>({
            getProps: () => ({} as any),
            data: () => mockedData,
        });
        const simpleList = new SimpleList({
            autoCollection: autoCollection,
            propertyGenerator: new SmartPropertyGenerator(autoCollection)
        });
        const rendered = simpleList.render();
        expect(rendered).toEqual(
            <div>
                <div key={0}>
                    <React.Fragment>
                        <div key={'name'}>
                            <b>name</b>
                            <span>ali</span>
                        </div>
                        <div key={'year'}>
                            <b>year</b>
                            <span>1993</span>
                        </div>
                    </React.Fragment>
                </div>
                <div key={1}>
                    <React.Fragment>
                        <div key={'name'}>
                            <b>name</b>
                            <span>huda</span>
                        </div>
                        <div key={'year'}>
                            <b>year</b>
                            <span>1994</span>
                        </div>
                    </React.Fragment>
                </div>
            </div>
        )
    });
});