/// <reference types="react" />
import { BaseCollectionComponent, BaseCollectionComponentProps } from "./CollectionComponent";
import { TableRenderOptions } from "../Config/Table/TableRenderOption";
import { Column } from "../Config/Table/Column";
export declare class SimpleTable<ItemDataType, RenderOptions extends TableRenderOptions, Props extends BaseCollectionComponentProps<ItemDataType, RenderOptions>, State = any> extends BaseCollectionComponent<Column, ItemDataType, RenderOptions, Props, State> {
    protected renderCollection: () => any;
    protected renderTableHeader: () => any;
    protected renderHeaderCell: (column: Column) => JSX.Element;
    protected renderRow: (item: ItemDataType, index: number, columns: Column[]) => any;
    protected renderCell: (value: any, item: ItemDataType, index: number, column: Column) => any;
}
