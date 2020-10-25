import {SimpleDataSource} from "../../../DataSource/DataSource";

describe('SimpleDataSource', () => {

    it('should return data', function (done) {
        const data = [{id: 1, name: 'Ali'}];
        const ds = new SimpleDataSource<any, any>(data);
        expect(ds.getOptions()).toEqual({});
        ds.getData().then(data => {
            expect(data).toBe(data);
            done();
        });
    });

});