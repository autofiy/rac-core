import {NoPropertyOrdering} from "../../../Services/PropertyServices/Middleware/Order/NoPropertyOrdering";
import {Property} from "../../../Services/PropertyServices/PropertyGenerator";

describe('NoPropertyOrdering', () => {

    it('should return order as is', function () {
        const ordering = new NoPropertyOrdering();
        const properties: Property[] = [{name: 'name', title: 'name'}, {name: 'age', title: 'age'}, {
            name: 'email',
            title: 'email'
        }];
        const result = ordering.handle(properties);
        expect(result.break).not.toEqual(true);
        expect(result.data).toEqual(properties);
    });

});