import {BaseCollectionComponent, BaseCollectionComponentProps} from "./CollectionComponent";
import React from "react";
import {TableRenderOptions} from "../Config/Table/TableRenderOption";
import {Column} from "../Config/Table/Column";


export class SimpleTable<ItemDataType, RenderOptions extends TableRenderOptions,
    Props extends BaseCollectionComponentProps<ItemDataType, RenderOptions>,
    State = any> extends BaseCollectionComponent<ItemDataType, RenderOptions, Props, State> {

    public render(): any {
        const table = this.renderTableElement();
        return this.renderTableWrapper(table);
    }

    protected renderTableWrapper = (table: any): any => {
        const options = this.getRenderOptions();
        const Wrapper = options.getCollectionWrapper();
        const props = options.getWrapperProps();
        return (<Wrapper {...props}>{table}</Wrapper>);
    };

    protected renderTableElement = (): any => {
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
        const headerCellProps = column.getHeaderCellProps();
        return <React.Fragment key={column.getName()}>
            <th key={column.getName()} {...headerCellProps}>{column.getTitle()}</th>
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

        const cellClassName = column.getCellClassName(item, index);
        const cellProps = column.getCellProps();
        return (<React.Fragment key={column.getName()}>
            <td className={cellClassName} {...cellProps}>{value}</td>
        </React.Fragment>);
    };

}
