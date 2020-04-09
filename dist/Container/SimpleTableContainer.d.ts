import { BaseCollectionContainer, BaseCollectionContainerProps, BaseCollectionContainerState } from "./CollectionContainer";
import { KeyExtractor } from "../KeyExtractor/KeyExtractor";
export default class SimpleTableContainer<Props extends BaseCollectionContainerProps = BaseCollectionContainerProps, State extends BaseCollectionContainerState = BaseCollectionContainerState> extends BaseCollectionContainer<Props, State> {
    protected readonly keyExtractor: KeyExtractor;
    constructor(props: Props);
    renderCollection(): any;
}
