import {BaseCollectionRenderOptions, CollectionRenderOptionsConfig} from "../CollectionRenderOptions";
import {Column, ColumnConfig} from "./Column";


export interface TableRenderOptionsConfig extends CollectionRenderOptionsConfig {
    columns?: ColumnConfig[];
    nameMap?: { [name: string]: string };
    overrideColumns?: { [name: string]: ColumnConfig };


    headerRowClassName?: string;
    headerRowProps?: any;

    rowClassName?: string | ((item: any, index: number) => any);
    rowProps?: any;
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

        this.columns = this.config.columns.map(columnConfig => new Column(columnConfig));
    }

    getProperties(data: any): Column[] {
        if (this.columns.length > 0)
            return this.columns;

        const firstRow = data ? (data[0] ?? {}) : {};
        const keysOfData = Object.keys(firstRow);

        return this.extractColumns(keysOfData);
    }

    private extractColumns(keysOfData: string[]): Column[] {
        const nameMap = this.config.nameMap ?? {};
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
        return columns;
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


}
