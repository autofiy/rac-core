import {Property} from "../../../Services/PropertyServices/PropertyGenerator";
import {CustomPropertyOrdering} from "../../../Services/PropertyServices/Middleware/Order/CustomPropertyOrdering";

describe('CustomPropertyOrdering', () => {
    it('should order properties based on function', function () {
        const properties: Property[] = [
            {name: 'age', title: 'age'},
            {name: 'name', title: 'name'},
            {name: 'email', title: 'email'}
        ];
        const orderFunction = (passedProperties: Property[]) => {
            expect(passedProperties).toEqual(properties);
            return ['name', 'email'];
        }
        const ordering = new CustomPropertyOrdering({orderBy: orderFunction});
        const result = ordering.handle(properties);
        expect(result.break).not.toEqual(true)
        expect(result.data).toEqual([
            {name: 'name', title: 'name'},
            {name: 'email', title: 'email'},
        ]);
    });
});