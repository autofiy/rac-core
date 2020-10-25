import {
    BaseCollectionContainer,
    BaseCollectionContainerProps,
    BaseCollectionContainerState
} from "./CollectionContainer";
import {IndexedKeyExtractor, KeyExtractor} from "../KeyExtractor/KeyExtractor";
import React from "react";
import {SimpleTable} from "../CollectionComponent/SimpleTable";


export default class SimpleTableContainer<Props extends BaseCollectionContainerProps = BaseCollectionContainerProps,
    State extends BaseCollectionContainerState = BaseCollectionContainerState>
    extends BaseCollectionContainer<Props, State> {
    protected readonly keyExtractor: KeyExtractor;

    constructor(props: Props) {
        super(props);
        this.keyExtractor = props.keyExtractor ?? new IndexedKeyExtractor();
    }

    renderCollection(): any {
        return <SimpleTable data={this.state.data}
                            keyExtractor={this.keyExtractor}
                            renderOptions={this.props.collectionOptions}/>
    }

}