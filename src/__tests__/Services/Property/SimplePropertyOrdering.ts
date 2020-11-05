import {SimplePropertyOrdering} from "../../../Services/PropertyServices/Middleware/Order/SimplePropertyOrdering";
import {Property} from "../../../Services/PropertyServices/PropertyGenerator";

describe('SimplePropertyOrdering', () => {

    it('should order based on string array', function () {
        const ordering = new SimplePropertyOrdering({orderBy: ['name', 'email', 'age']});
        const properties: Property[] = [
            {name: 'age', title: 'age'},
            {name: 'name', title: 'name'},
            {name: 'email', title: 'email'}
        ];
        const result = ordering.handle(properties);
        expect(result.break).not.toEqual(true)
        expect(result.data).toEqual([
            {name: 'name', title: 'name'},
            {name: 'email', title: 'email'},
            {name: 'age', title: 'age'},
        ]);
    });

});