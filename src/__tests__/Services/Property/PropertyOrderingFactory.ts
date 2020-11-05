import {DefaultPropertyOrderingFactory} from "../../../Services/PropertyServices/Middleware/Order/PropertyOrderingFactory";
import {SimplePropertyOrdering} from "../../../Services/PropertyServices/Middleware/Order/SimplePropertyOrdering";
import {CustomPropertyOrdering} from "../../../Services/PropertyServices/Middleware/Order/CustomPropertyOrdering";
import {NoPropertyOrdering} from "../../../Services/PropertyServices/Middleware/Order/NoPropertyOrdering";

describe('DefaultPropertyOrderingFactory', () => {

    it('should generate SimpleOrdering', function () {
        const factory = new DefaultPropertyOrderingFactory({
            orderBy: ['a', 'b']
        });
        const ordering = factory.getOrdering();
        expect(ordering).toBeInstanceOf(SimplePropertyOrdering);
    });

    it('should generate CustomOrdering', function () {
        const factory = new DefaultPropertyOrderingFactory({
            orderBy: () => ['a', 'b']
        });
        const ordering = factory.getOrdering();
        expect(ordering).toBeInstanceOf(CustomPropertyOrdering);
    });

    it('should generate NoOrdering', function () {
        const factory = new DefaultPropertyOrderingFactory({});
        const ordering = factory.getOrdering();
        expect(ordering).toBeInstanceOf(NoPropertyOrdering);
    });

});