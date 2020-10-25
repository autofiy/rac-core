import {IndexedKeyExtractor, PropertyKeyExtractor} from "../../KeyExtractor/KeyExtractor";

describe('key extractor', () => {

    describe('IndexedKeyExtractor', () => {
        it('should extract key from index', function () {
            const keyExtractor = new IndexedKeyExtractor();
            const index = 10;
            const item = {name: 'ali'};
            const key = keyExtractor.getKey(index, item);
            expect(key).toEqual(index);
        });
    });

    describe('PropertyKeyExtractor', () => {
        it('should extract key from property', function () {
            const keyExtractor = new PropertyKeyExtractor('name');
            const index = 10;
            const item = {name: 'ali'};
            const key = keyExtractor.getKey(index, item);
            expect(key).toEqual('ali');
        });
    });

});