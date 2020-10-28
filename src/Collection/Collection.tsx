import {Component} from "react";

export interface Collection {
    render(): any;

    getData(): any;

    properties() : any;
}

export class Collection extends Component {


}