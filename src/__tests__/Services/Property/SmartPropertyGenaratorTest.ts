import {SmartPropertyGenerator} from "../../../Services/PropertyServices/PropertyGenerator";
import {mock} from "jest-mock-extended";
import {IAutoCollection} from "../../../AutoCollection/IAutoCollection";
import {DataManager} from "../../../Services/DataManager/DataManager";
import {AutoCollectionProps} from "../../../AutoCollection/AutoCollectionProps";

describe('SmartPropertyGenerator', () => {

    function generateMockedAutoCollection(props: AutoCollectionProps = {} as any, data?: any[]) {
        if (data === undefined) {
            data = [
                {name: 'Ali', age: 18, email: 'ali@email.com', phone: '0000'}
            ];
        }

        let mockedDataManager = mock<DataManager>({
            get(): any {
                return data;
            }
        });
        return mock<IAutoCollection>({data: () => mockedDataManager, getProps: () => props});
    }

    it('should ', function () {
        const ac = generateMockedAutoCollection();
        const generator = new SmartPropertyGenerator(ac);
        const properties = generator.generate();
        expect(properties).toEqual([
            {title: 'name', name: 'name'},
            {title: 'age', name: 'age'},
            {title: 'email', name: 'email'},
            {title: 'phone', name: 'phone'},
        ]);
    });

    it('should use properties from configuration', function () {
        const ac = generateMockedAutoCollection({
            properties: {
                properties: [
                    {name: 'name', title: 'THE NAME'},
                    {name: 'email', title: 'CONTACT'}
                ]
            },
            as: null as any
        });
        const generator = new SmartPropertyGenerator(ac);
        const properties = generator.generate();
        expect(properties).toEqual([
            {title: 'THE NAME', name: 'name'},
            {title: 'CONTACT', name: 'email'},
        ]);
    });

    it('should use map titles from configuration', function () {
        const ac = generateMockedAutoCollection({
            properties: {
                titles: {'name': 'THE NAME', email: 'CONTACT'}
            },
            as: null as any
        });
        const generator = new SmartPropertyGenerator(ac);
        const properties = generator.generate();
        expect(properties).toEqual([
            {title: 'THE NAME', name: 'name'},
            {title: 'age', name: 'age'},
            {title: 'CONTACT', name: 'email'},
            {title: 'phone', name: 'phone'},
        ]);
    });

    it('should order properties', function () {
        const ac = generateMockedAutoCollection({
            properties: {
                orderBy: ['email', 'name', 'age'],
                titles: {name: 'THE NAME', email: 'CONTACT'}
            },
            as: null as any
        });
        const generator = new SmartPropertyGenerator(ac);
        const properties = generator.generate();
        expect(properties).toEqual([
            {title: 'CONTACT', name: 'email'},
            {title: 'THE NAME', name: 'name'},
            {title: 'age', name: 'age'},
        ]);
    });

    it('should return empty arr when data is empty array', function () {
        const ac = generateMockedAutoCollection({} as any, []);
        const generator = new SmartPropertyGenerator(ac);
        const properties = generator.generate();
        expect(properties).toEqual([]);
    });


    it('should return empty arr when no data', function () {
        const ac = generateMockedAutoCollection({} as any, null as any);
        const generator = new SmartPropertyGenerator(ac);
        const properties = generator.generate();
        expect(properties).toEqual([]);
    });

    it('should return empty arr when data is not array', function () {
        const ac = generateMockedAutoCollection({} as any, {} as any);
        const generator = new SmartPropertyGenerator(ac);
        const properties = generator.generate();
        expect(properties).toEqual([]);
    });

});