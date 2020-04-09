import { BaseCollectionRenderOptions, CollectionRenderOptionsConfig } from "../CollectionRenderOptions";
import { Column, ColumnConfig } from "./Column";
export interface TableRenderOptionsConfig extends CollectionRenderOptionsConfig {
    columns?: ColumnConfig[];
    titleMap?: {
        [name: string]: string;
    };
    overrideColumns?: {
        [name: string]: ColumnConfig;
    };
    headerRowClassName?: string;
    headerRowProps?: any;
    rowClassName?: string | ((item: any, index: number) => any);
    rowProps?: any;
}
export declare class TableRenderOptions extends BaseCollectionRenderOptions<Column, TableRenderOptionsConfig> {
    protected columns: Column[];
    constructor(config: TableRenderOptionsConfig);
    private initializeColumns;
    getProperties(data: any): Column[];
    private extractColumns;
    getHeaderRowClassName(): string;
    getHeaderRowProps(): any;
    getRowClassName(item: any, index: number): string;
    getRowProps(item: any, index: number): any;
}
