import {Component} from "react";
import {DataSource} from "../DataSource/DataSource";
import {ICollection} from "./ICollection";

export interface CollectionProps {
    as: any;
    data: (collection: ICollection) => DataSource<any, any>,
    extra?: any;
}

export class Collection extends Component {

    //get data
    //update ui
    //render

}