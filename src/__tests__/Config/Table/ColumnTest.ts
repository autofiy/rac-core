import {Column} from "../../../Config/Table/Column";

describe('Column', () => {

    const baseConfig = {name: 'some name', title: 'some title'};


    it('should get name', function () {
        const column = new Column({...baseConfig});
        const name = column.getName();
        expect(name).toEqual('some name');
    });

    it('should get title', function () {
        const column = new Column({...baseConfig});
        const title = column.getTitle();
        expect(title).toEqual('some title');
    });


    it('should return supplied custom header cell render from config', function () {
        const render = () => null;
        const column = new Column({...baseConfig, renderHeaderCell: render});
        const renderFunction = column.getCustomHeaderCellRender();
        expect(renderFunction).toBe(render);
    });


    it('should return supplied custom cell render from config', function () {
        const render = () => null;
        const column = new Column({...baseConfig, renderCell: render});
        const renderFunction = column.getCustomCellRender();
        expect(renderFunction).toBe(render);
    });

    it('should return supplied header cell props from config', function () {
        const column = new Column({...baseConfig, headerCellProps: {x: 1}});
        const props = column.getHeaderCellProps();
        expect(props).toEqual({x: 1});
    });


    it('should return supplied cell props from config', function () {
        const column = new Column({...baseConfig, cellProps: {x: 1}});
        const props = column.getCellProps();
        expect(props).toEqual({x: 1});
    });

    it('should return header cell classname', function () {
        const column = new Column({...baseConfig, headerCellClassName: 'header-cell'});
        const className = column.getHeaderCellClassName();
        expect(className).toEqual('header-cell');
    });


    it('should return classname for cell from when string is supplied', function () {
        const column = new Column({...baseConfig, cellClassName: 'cell'});
        const className = column.getCellClassName(null, 0);
        expect(className).toEqual('cell');
    });

    it('should return classname for cell from when function is supplied', function () {
        const column = new Column({...baseConfig, cellClassName: (item: any, index: any) => `${item.name}-${index}`});
        const className = column.getCellClassName({name: 'cell'}, 1);
        expect(className).toEqual('cell-1');
    });


    it('should return default values', function () {
        const column = new Column({...baseConfig});
        expect(column.getHeaderCellClassName()).toEqual('');
        expect(column.getCellProps()).toEqual({});
        expect(column.getHeaderCellProps()).toEqual({});
        expect(column.getCustomCellRender()).toEqual(undefined);
        expect(column.getCustomHeaderCellRender()).toEqual(undefined);
        expect(column.getCellClassName(null, 0)).toEqual('');
    });


});