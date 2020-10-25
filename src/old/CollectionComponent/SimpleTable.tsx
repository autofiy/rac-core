import { BaseCollectionComponent, BaseCollectionComponentProps } from "./CollectionComponent";
import React from "react";
import { TableRenderOptions } from "../Config/Table/TableRenderOption";
import { Column } from "../Config/Table/Column";


export class SimpleTable<ItemDataType, RenderOptions extends TableRenderOptions,
    Props extends BaseCollectionComponentProps<ItemDataType, RenderOptions>,
    State = any> extends BaseCollectionComponent<Column, ItemDataType, RenderOptions, Props, State> {


    protected renderCollection = (): any => {
        const options = this.getRenderOptions();
        const columns = options.getProperties(this.getData());
        const className = options.getCollectionClassName();
        return (<table className={className}>
            {this.renderTableHeader()}
            <tbody>
                {
                    this.getData().map((value, index) => this.renderRow(value, index, columns))
                }
            </tbody>
        </table>);
    };

    protected renderTableHeader = (): any => {
        const options: TableRenderOptions = this.getRenderOptions();
        const columns = options.getProperties(this.getData());

        const className = options.getHeaderRowClassName();
        const rowProps = options.getHeaderRowProps();

        return (<thead>
            <tr className={className} {...rowProps}>
                {
                    columns.map(column => this.renderHeaderCell(column))
                }
            </tr>
        </thead>);
    };

    protected renderHeaderCell = (column: Column) => {
        const renderFunction = column.getCustomHeaderCellRender();
        if (renderFunction)
            return (<React.Fragment key={column.getName()}>
                {renderFunction()}
            </React.Fragment>);
        const options = this.getRenderOptions();
        const headerCellProps = column.getHeaderCellProps();
        const headerCellClassName = column.getHeaderCellClassName() ? column.getHeaderCellClassName() : options.getHeaderCellClassName();
        return <React.Fragment key={column.getName()}>
            <th className={headerCellClassName} key={column.getName()} {...headerCellProps}>{column.getTitle()}</th>
        </React.Fragment>;
    };

    protected renderRow = (item: ItemDataType, index: number, columns: Column[]): any => {
        const options = this.getRenderOptions();
        const key = this.props.keyExtractor.getKey(index, item);
        const customRender = options.getCustomItemRender();
        if (customRender)
            return customRender(item, index, key, columns);

        const rowProps = options.getRowProps(item, index);
        const className = options.getRowClassName(item, index);
        return (<tr key={key} className={className} {...rowProps}>
            {
                columns.map(column => {
                    const obj: any = item;
                    const value = obj && obj[column.getName()] ? obj[column.getName()] : '';
                    return this.renderCell(value, item, index, column)
                })
            }
        </tr>);
    };

    protected renderCell = (value: any, item: ItemDataType, index: number, column: Column): any => {
        const renderFunction = column.getCustomCellRender();
        if (renderFunction)
            return (<React.Fragment key={column.getName()}>
                {renderFunction(value, item, index)}
            </React.Fragment>);

        const options = this.getRenderOptions();

        const cellClassName = column.getCellClassName(item, index) ? column.getCellClassName(item, index) : options.getCellClassName(item, index);
        const cellProps = Object.keys(column.getCellProps()).length > 0 ? column.getCellProps() : options.getCellProps(item, index);
        return (<React.Fragment key={column.getName()}>
            <td className={cellClassName} {...cellProps}>{value}</td>
        </React.Fragment>);
    };

}
