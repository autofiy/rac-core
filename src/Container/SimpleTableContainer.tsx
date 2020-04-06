import {BaseCollectionContainer, BaseCollectionContainerProps} from "./CollectionContainer";
import {IndexedKeyExtractor, KeyExtractor} from "../KeyExtractor/KeyExtractor";
import React from "react";
import {SimpleTable} from "../CollectionComponent/SimpleTable";


export default class SimpleTableContainer extends BaseCollectionContainer {
    protected readonly keyExtractor: KeyExtractor;

    constructor(props: BaseCollectionContainerProps) {
        super(props);
        this.keyExtractor = props.keyExtractor ?? new IndexedKeyExtractor();
    }

    renderCollection(): any {
        return <SimpleTable data={this.state.data}
                            keyExtractor={this.keyExtractor}
                            renderOptions={this.props.collectionOptions}/>
    }

}