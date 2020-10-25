import {PropertyConfig, SimpleProperty} from "../CollectionRenderOptions";

export interface ColumnConfig extends PropertyConfig {
    renderHeaderCell?: () => any;
    renderCell?: (value: any, item: any, index: number) => any;

    headerCellClassName?: string;
    headerCellProps?: any;

    cellClassName?: string | ((item: any, index: number) => string);
    cellProps?: any;
}

export class Column extends SimpleProperty<ColumnConfig> {

    getCustomHeaderCellRender(): undefined | (() => any) {
        return this.config.renderHeaderCell;
    }

    getCustomCellRender(): undefined | ((value: any, item: any, index: number) => any) {
        return this.config.renderCell;
    }

    getHeaderCellProps(): any {
        return this.config.headerCellProps ?? {};
    }

    getCellProps(): any {
        return this.config.cellProps ?? {};
    }

    getHeaderCellClassName(): string {
        return this.config.headerCellClassName ?? '';
    }

    getCellClassName(item: any, index: number): string {
        if (typeof this.config.cellClassName === "function")
            return this.config.cellClassName(item, index);
        if (typeof this.config.cellClassName === "string")
            return this.config.cellClassName;
        return '';
    }

}