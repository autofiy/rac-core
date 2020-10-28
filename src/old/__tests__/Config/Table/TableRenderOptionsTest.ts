import {TableRenderOptions} from "../../../Config/Table/TableRenderOption";
import * as React from "react";

describe('TableRenderOptions', () => {

    it('should return defaults', function () {
        const options = new TableRenderOptions({});
        expect(options.getCollectionWrapper()).toEqual(React.Fragment);
        expect(options.getRowProps(null, 0)).toEqual({});
        expect(options.getHeaderRowProps()).toEqual({});
        expect(options.getHeaderRowClassName()).toEqual('');
        expect(options.getRowClassName(null, 0)).toEqual('');
        expect(options.getCollectionClassName()).toEqual('');
        expect(options.getCollectionProps()).toEqual({});
        expect(options.getWrapperProps()).toEqual({});

        expect(options.getHeaderCellProps()).toEqual({});
        expect(options.getHeaderCellClassName()).toEqual('');

        expect(options.getCellClassName({}, 0)).toEqual('');
        expect(options.getCellProps({}, 0)).toEqual({});

        expect(options.getProperties([])).toEqual([]);
        expect(options.getCustomItemRender()).toBeUndefined();
    });

    it('should return header row classname', function () {
        const options = new TableRenderOptions({headerRowClassName: 'table-header'});
        const className = options.getHeaderRowClassName();
        expect(className).toEqual('table-header');
    });


    describe('Row/Cell', () => {

        it('should return row classname from string', function () {
            const options = new TableRenderOptions({rowClassName: 'row'});
            const className = options.getRowClassName(null, 0);
            expect(className).toEqual('row');
        });


        it('should return row classname from function', function () {
            const options = new TableRenderOptions({rowClassName: (item: any, index) => `${item.name}-${index}`});
            const className = options.getRowClassName({name: 'row'}, 1);
            expect(className).toEqual('row-1');
        });


        it('should return cell classname from string', function () {
            const options = new TableRenderOptions({cellClassName: 'cell'});
            const className = options.getCellClassName(null, 0);
            expect(className).toEqual('cell');
        });


        it('should return cell classname from function', function () {
            const options = new TableRenderOptions({cellClassName: (item: any, index) => `${item.name}-${index}`});
            const className = options.getCellClassName({name: 'cell'}, 1);
            expect(className).toEqual('cell-1');
        });
    })


    it('should return header row props', function () {
        const options = new TableRenderOptions({headerRowProps: {x: 1}});
        const props = options.getHeaderRowProps();
        expect(props).toEqual({x: 1});
    });

    it('should return row props', function () {
        const options = new TableRenderOptions({rowProps: {x: 1}});
        const props = options.getRowProps(null, 0);
        expect(props).toEqual({x: 1});
    });

    it('should return properties from config', function () {
        const options = new TableRenderOptions({
            columns: [{name: 'name', title: 'name'}, {name: 'id', title: 'id'}]
        });
        const columns = options.getProperties([]);
        expect(columns).toHaveLength(2);
        expect(columns[0].getName()).toEqual('name');
        expect(columns[1].getName()).toEqual('id');
    });

    it('should extract properties from data and config', function () {
        const data = [
            {id: 1, name: 'ali', category: 'category', age: 19},
            {id: 1, name: 'ali', category: 'category', age: 19},
            {id: 1, name: 'ali', category: 'category', age: 19}
        ];
        const options = new TableRenderOptions({
            titleMap: {id: 'Person#'}, overrideColumns: {age: {name: 'age', title: 'EmpAge', cellClassName: 'age-cell'}}
        });
        const columns = options.getProperties(data);
        expect(columns).toHaveLength(4);
        expect(columns[0].getTitle()).toEqual('Person#');
        expect(columns[1].getTitle()).toEqual('name');
        expect(columns[2].getTitle()).toEqual('category');
        expect(columns[3].getName()).toEqual('age');
        expect(columns[3].getTitle()).toEqual('EmpAge');
        expect(columns[3].getCellClassName(null, 0)).toEqual('age-cell');
    });

    it('should return empty array for properties when data is empty and no properties config', function () {
        const options = new TableRenderOptions({});
        const columns = options.getProperties([]);
        expect(columns).toEqual([]);
    });

    it('should return empty array for properties when data is null and no properties config', function () {
        const options = new TableRenderOptions({});
        const columns = options.getProperties(null);
        expect(columns).toEqual([]);
    });

    it('should return custom item render', function () {
        const renderFunction = jest.fn();
        const options = new TableRenderOptions({renderItem: renderFunction});
        expect(options.getCustomItemRender()).toEqual(renderFunction);
    });

    it('should return collection classname', function () {
        const options = new TableRenderOptions({collectionClassName: 'test-class-name'});
        expect(options.getCollectionClassName()).toEqual('test-class-name');
    });


    it('should return headerCellClassName/headerCellProps', function () {
        const options = new TableRenderOptions({
            headerCellClassName: 'header-cell-class-name',
            headerCellProps: {x: 1}
        });
        expect(options.getHeaderCellClassName()).toEqual('header-cell-class-name');
        expect(options.getHeaderCellProps()).toEqual({x: 1});
    });


    it('should append extra properties', function () {
        const options = new TableRenderOptions({
            columns: [{name: 'name', title: 'name'}, {name: 'id', title: 'id'}],
            extraColumns: [{name: 'actions', title: 'Actions'}, {name: 'total', title: 'Total'}]
        });
        const columns = options.getProperties([]);
        expect(columns).toHaveLength(4);
        expect(columns[0].getName()).toEqual('name');
        expect(columns[1].getName()).toEqual('id');
        expect(columns[2].getName()).toEqual('actions');
        expect(columns[3].getName()).toEqual('total');
    });

    it('should append extra properties when properties extracted from data', function () {
        const options = new TableRenderOptions({
            extraColumns: [{name: 'actions', title: 'Actions'}, {name: 'total', title: 'Total'}]
        });
        const columns = options.getProperties([
            {id: '1', name: 'Ali'}
        ]);
        expect(columns).toHaveLength(4);
        expect(columns[0].getName()).toEqual('id');
        expect(columns[1].getName()).toEqual('name');
        expect(columns[2].getName()).toEqual('actions');
        expect(columns[3].getName()).toEqual('total');
    });

});