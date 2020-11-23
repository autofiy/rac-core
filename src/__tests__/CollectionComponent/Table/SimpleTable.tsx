import {mock} from "jest-mock-extended";
import {IAutoCollection} from "../../../AutoCollection/IAutoCollection";
import {SimpleTable} from "../../../CollectionComponent/Table/SimpleTable";
import {DataManager} from "../../../Services/DataManager/DataManager";
import React from "react";
import {SmartPropertyGenerator} from "../../../Services/PropertyServices/PropertyGenerator";

describe('SimpleTable', () => {

    it('should render table', function () {
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
        const simpleTable = new SimpleTable({
            autoCollection: autoCollection,
            propertyGenerator: new SmartPropertyGenerator(autoCollection)
        });
        const rendered = simpleTable.render();
        expect(rendered).toEqual(
            <table>
                <thead>
                <tr>
                    <React.Fragment key={'name'}>
                        <th>name</th>
                    </React.Fragment>
                    <React.Fragment key={'year'}>
                        <th>year</th>
                    </React.Fragment>
                </tr>
                </thead>
                <tbody>
                <tr key={0}>
                    <React.Fragment key={'name'}>
                        <td>ali</td>
                    </React.Fragment>
                    <React.Fragment key={'year'}>
                        <td>1993</td>
                    </React.Fragment>
                </tr>
                <tr key={1}>
                    <React.Fragment key={'name'}>
                        <td>huda</td>
                    </React.Fragment>
                    <React.Fragment key={'year'}>
                        <td>1994</td>
                    </React.Fragment>
                </tr>
                </tbody>
            </table>
        )
    });

});