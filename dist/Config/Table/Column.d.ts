import { PropertyConfig, SimpleProperty } from "../CollectionRenderOptions";
export interface ColumnConfig extends PropertyConfig {
    renderHeaderCell?: () => any;
    renderCell?: (value: any, item: any, index: number) => any;
    headerCellClassName?: string;
    headerCellProps?: any;
    cellClassName?: string | ((item: any, index: number) => string);
    cellProps?: any;
}
export declare class Column extends SimpleProperty<ColumnConfig> {
    getCustomHeaderCellRender(): undefined | (() => any);
    getCustomCellRender(): undefined | ((value: any, item: any, index: number) => any);
    getHeaderCellProps(): any;
    getCellProps(): any;
    getHeaderCellClassName(): string;
    getCellClassName(item: any, index: number): string;
}
