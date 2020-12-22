import { Component } from "react";
import { IAutoCollection } from "../AutoCollection/IAutoCollection";
import { Property } from "@autofiy/property";

export interface CollectionComponent {
    render(): any;

    getData(): any;

    getProperties(): Property[];

    getAutoCollection(): IAutoCollection;
}

interface Props {
    properties: Property[];
    autoCollection: IAutoCollection;
}

export class CollectionComponentBase extends Component<Props> implements CollectionComponent {
    public render(): any {
        return null;
    }

    getData(): any {
        return this.getAutoCollection().data().get();
    }

    getProperties(): Property[] {
        return this.props.properties;
    }

    getAutoCollection(): IAutoCollection {
        return this.props.autoCollection;
    }

}


export class EmptyComponent extends CollectionComponentBase {
    render() {
        return null;
    }
}