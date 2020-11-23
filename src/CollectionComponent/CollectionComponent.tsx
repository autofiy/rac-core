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

    private properties: Property[] | null = null;

    public render(): any {
        return null;
    }

    getData(): any {
        return this.getAutoCollection().data().get();
    }

    getProperties(): Property[] {
        if (this.properties === null && this.isDataReady()) {
            this.properties = this.props.propertyGenerator.generate();
        }
        return this.properties ?? [];
    }

    getAutoCollection(): IAutoCollection {
        return this.props.autoCollection;
    }

    private isDataReady(): boolean {
        return this.getData().length > 0;
    }

}


export class EmptyComponent extends CollectionComponentBase {
    render() {
        return null;
    }
}