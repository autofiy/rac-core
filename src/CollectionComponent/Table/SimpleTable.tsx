import {CollectionComponentBase} from "../CollectionComponent";
import React from "react";
import {CellRenderer, SimpleBodyCellRenderer, SimpleHeaderCellRenderer} from "./CellRenderer";


export class SimpleTable extends CollectionComponentBase {

    private readonly headerCellRenderer: CellRenderer;
    private readonly bodyCellRenderer: CellRenderer;


    constructor(props: any) {
        super(props);
        this.headerCellRenderer = this.getHeaderCellRenderer();
        this.bodyCellRenderer = this.getBodyCellRenderer();
    }

    protected getHeaderCellRenderer(): CellRenderer {
        return new SimpleHeaderCellRenderer(this.getAutoCollection());
    }

    protected getBodyCellRenderer(): CellRenderer {
        return new SimpleBodyCellRenderer(this.getAutoCollection());
    }

    render() {
        return <table>
            {this.renderTableHead()}
            {this.renderTableBody()}
        </table>
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
        return this.getProperties().map(p => this.headerCellRenderer.render(p, null));
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
                        this.getProperties().map(p => this.bodyCellRenderer.render(p, item))
                    }
                </tr>
        );
    }

}