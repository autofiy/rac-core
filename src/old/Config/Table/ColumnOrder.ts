import {Column} from "./Column";

export class ColumnOrder {
    protected readonly columns: Column[];
    protected readonly orderBy?: string[] | ((columns: Column[]) => string[]);


    constructor(columns: Column[], orderBy: string[] | undefined | ((columns: Column[]) => string[])) {
        this.columns = columns;
        this.orderBy = orderBy;
    }

    public order(): Column[] {
        const orderByArray = this.getOrderByArray();
        const orderedColumns = [];
        for (let columnName of orderByArray) {
            orderedColumns.push(this.getColumnByName(columnName));
        }
        return orderedColumns;
    }

    protected getColumnByName(name: string): Column {
        for (let column of this.columns) {
            if (column.getName() === name) {
                return column;
            }
        }
        throw Error(`Cannot find column ${name}`);
    }

    protected getOrderByArray(): string[] {
        const order = this.orderBy;
        if (Array.isArray(order))
            return order;
        else if (typeof order === "function")
            return order(this.columns);

        return this.columns.map(col => String(col.getName()));
    }
}