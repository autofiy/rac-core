import {Property} from "../../../../Services/PropertyServices/PropertyGenerator";
import {ExtraPropertiesMiddleware} from "../../../../Services/PropertyServices/Middleware/ExtraPropertiesMiddleware";

describe("ExtraPropertyMiddleware", () => {
    it('should return empty array when the passed properties are empty', function () {
        const properties: Property[] = [];
        const extraMiddleware = new ExtraPropertiesMiddleware({extraProperties: [{title: 'Test', name: 'test'}]});
        const newProperties = extraMiddleware.handle(properties);
        expect(newProperties).toEqual({data : []});
    });
})