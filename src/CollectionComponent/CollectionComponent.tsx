import {Component} from "react";
import {Property, PropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";
import {IAutoCollection} from "../AutoCollection/IAutoCollection";

export interface CollectionComponent {
    render(): any;

    getData(): any;

    getProperties(): Property[];

    getAutoCollection(): IAutoCollection;
}

interface Props {
    propertyGenerator: PropertyGenerator;
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
        return this.props.propertyGenerator.generate();
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