import {ICollection} from "./ICollection";

export interface ICollectionData {

    add(): void;

    edit(): void;

    remove(): void;

    filter(): void;

    all(): void;

}

export class CollectionData implements ICollectionData {

    private readonly collection: ICollection;

    constructor(collection: ICollection) {
        this.collection = collection;
    }

    add(): void {

    }

    all(): void {

    }

    edit(): void {
    }

    filter(): void {
    }

    remove(): void {
    }

}