import {Column} from "../../../Config/Table/Column";
import {PropertyOrder} from "../../../../Services/PropertyServices/PropertyOrder";

describe('ColumnOrder', () => {
    it('should order properties using orderBy as string[]', function () {
        const columns = [
            new Column({name: 'id', title: 'Id'}),
            new Column({name: 'name', title: 'Name'}),
            new Column({name: 'email', title: 'Email'}),
            new Column({name: 'phone', title: 'Phone'}),
        ];
        const orderBy = ['name', 'phone', 'email', 'id'];
        const order = new PropertyOrder(columns, orderBy);
        const orderedColumns = order.order();

        expect(orderedColumns[0].getName()).toEqual('name');
        expect(orderedColumns[1].getName()).toEqual('phone');
        expect(orderedColumns[2].getName()).toEqual('email');
        expect(orderedColumns[3].getName()).toEqual('id');
    });


    it('should order properties using orderBy as function', function () {
        const columns = [
            new Column({name: 'id', title: 'Id'}),
            new Column({name: 'name', title: 'Name'}),
            new Column({name: 'email', title: 'Email'}),
            new Column({name: 'phone', title: 'Phone'}),
        ];

        const orderBy = () => ['name', 'phone', 'email', 'id'];
        const order = new PropertyOrder(columns, orderBy);
        const orderedColumns = order.order();

        expect(orderedColumns[0].getName()).toEqual('name');
        expect(orderedColumns[1].getName()).toEqual('phone');
        expect(orderedColumns[2].getName()).toEqual('email');
        expect(orderedColumns[3].getName()).toEqual('id');
    });

    it('should throw exception when order by column not exists', function () {
        const columns = [
            new Column({name: 'id', title: 'Id'}),
            new Column({name: 'name', title: 'Name'}),
            new Column({name: 'email', title: 'Email'}),
            new Column({name: 'phone', title: 'Phone'}),
        ];

        const orderBy = () => ['name', 'phone', 'not_exists_column', 'id'];
        const order = new PropertyOrder(columns, orderBy);

        expect(() => order.order()).toThrowError('Cannot find column not_exists_column');

    });

    it('should return same order when orderBy not function and not string[]', function () {
        const columns = [
            new Column({name: 'id', title: 'Id'}),
            new Column({name: 'name', title: 'Name'}),
            new Column({name: 'email', title: 'Email'}),
            new Column({name: 'phone', title: 'Phone'}),
        ];

        const order = new PropertyOrder(columns, undefined);
        const orderedColumns = order.order();
        expect(orderedColumns[0].getName()).toEqual('id');
        expect(orderedColumns[1].getName()).toEqual('name');
        expect(orderedColumns[2].getName()).toEqual('email');
        expect(orderedColumns[3].getName()).toEqual('phone');

    });
})