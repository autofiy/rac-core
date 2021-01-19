import {CollectionComponentBase} from "../CollectionComponent";
import React from "react";
import {CellRenderer, SimpleBodyCellRenderer, SimpleHeaderCellRenderer} from "./CellRenderer";


export class SimpleTable extends CollectionComponentBase {

    protected readonly headerCellRenderer: CellRenderer;
    protected readonly bodyCellRenderer: CellRenderer;


    constructor(props: any) {
        super(props);
        this.headerCellRenderer = this.getHeaderCellRenderer();
        this.bodyCellRenderer = this.getBodyCellRenderer();
    }

    render() {
        return <table>
            {this.renderTableHead()}
            {this.renderTableBody()}
        </table>
    }

    protected getHeaderCellRenderer(): CellRenderer {
        return new SimpleHeaderCellRenderer(this.getAutoCollection());
    }

    protected getBodyCellRenderer(): CellRenderer {
        return new SimpleBodyCellRenderer(this.getAutoCollection());
    }

    protected renderTableHead(): any {
        return <thead>
        <tr>
            {
                this.renderHeaderCells()
            }
        </tr>
        </thead>
    }

    protected renderHeaderCells(): any {
        return this.getProperties().map(p => this.headerCellRenderer.render(p, null, -1));
    }

    protected renderTableBody(): any {
        return <tbody>
        {
            this.renderRows()
        }
        </tbody>
    }

    protected renderRows(): any {
        return this.getData().map(
            (item: any, index: number) =>
                <tr key={index}>
                    {
                        this.getProperties().map(p => this.bodyCellRenderer.render(p, item, index))
                    }
                </tr>
        );
    }

}