import {BaseCollectionRenderOptions, CollectionRenderOptionsConfig} from "../CollectionRenderOptions";
import {Column, ColumnConfig} from "./Column";
import {PropertyOrder} from "../../../Property/PropertyOrder";


export interface TableRenderOptionsConfig extends CollectionRenderOptionsConfig {
    columns?: ColumnConfig[];
    extraColumns?: ColumnConfig[];

    orderBy?: string[] | ((columns: Column[]) => string[]);

    titleMap?: { [name: string]: string };
    overrideColumns?: { [name: string]: ColumnConfig };


    headerRowClassName?: string;
    headerRowProps?: any;

    rowClassName?: string | ((item: any, index: number) => any);
    rowProps?: any;


    cellClassName?: string | ((item: any, index: number) => any);
    cellProps?: any;

    headerCellClassName?: string;
    headerCellProps?: any;

}

export class TableRenderOptions extends BaseCollectionRenderOptions<Column, TableRenderOptionsConfig> {

    protected columns: Column[];

    constructor(config: TableRenderOptionsConfig) {
        super(config);
        this.columns = [];
        this.initializeColumns();
    }

    private initializeColumns() {
        if (!this.config.columns) {
            this.columns = [];
            return;
        }

        this.columns = this.config.columns.map(columnConfig => new Column(columnConfig))
            .concat(this.getExtraColumns());
    }

    protected getExtraColumns(): Column[] {
        if (this.config.extraColumns) {
            const columns: Column[] = [];
            for (let extraColumn of this.config.extraColumns) {
                columns.push(new Column(extraColumn));
            }
            return columns;
        }

        return [];
    }

    getProperties(data: any): Column[] {
        if (this.columns.length > 0)
            return this.columns;

        const firstRow = data ? (data[0] ?? {}) : {};
        const keysOfData = Object.keys(firstRow);

        return this.extractColumns(keysOfData);
    }

    private extractColumns(keysOfData: string[]): Column[] {
        const nameMap = this.config.titleMap ?? {};
        const overrideColumns = this.config.overrideColumns ?? {};

        const columns: Column[] = [];
        keysOfData.forEach(key => {
            if (overrideColumns[key]) {
                columns.push(new Column(overrideColumns[key]));
                return;
            }
            let title = nameMap[key] ?? key;
            columns.push(new Column({name: key, title: title}));
        });

        const allColumns = columns.concat(this.getExtraColumns());
        return null as any;
        //return new PropertyOrder(allColumns, this.config.orderBy).order();
    }


    public getHeaderRowClassName(): string {
        return this.config.headerRowClassName ?? '';
    }

    public getHeaderRowProps(): any {
        return this.config.headerRowProps ?? {};
    }

    public getRowClassName(item: any, index: number): string {
        if (typeof this.config.rowClassName === "function")
            return this.config.rowClassName(item, index);
        if (typeof this.config.rowClassName === "string")
            return this.config.rowClassName;
        return '';
    }

    // noinspection JSUnusedLocalSymbols
    public getRowProps(item: any, index: number) {
        return this.config.rowProps ?? {};
    }

    public getCellClassName(item: any, index: number): string {
        if (typeof this.config.cellClassName === "function")
            return this.config.cellClassName(item, index);
        if (typeof this.config.cellClassName === "string")
            return this.config.cellClassName;
        return '';
    }

    // noinspection JSUnusedLocalSymbols
    public getCellProps(item: any, index: number): any {
        return this.config.cellProps ?? {};
    }


    public getHeaderCellClassName(): string {
        return this.config.headerCellClassName ?? '';
    }

    public getHeaderCellProps(): any {
        return this.config.headerCellProps ?? {};
    }


}
