import { Column } from "./Column";
export declare class ColumnOrder {
    protected readonly columns: Column[];
    protected readonly orderBy?: string[] | ((columns: Column[]) => string[]);
    constructor(columns: Column[], orderBy: string[] | undefined | ((columns: Column[]) => string[]));
    order(): Column[];
    protected getColumnByName(name: string): Column;
    protected getOrderByArray(): string[];
}
