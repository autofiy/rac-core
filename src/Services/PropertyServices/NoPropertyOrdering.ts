import {PropertyOrderingBase} from "./PropertyOrder";

export class NoPropertyOrdering extends PropertyOrderingBase {

    getOrderedPropertiesName(): string[] {
        return this.properties.map(p => p.name);
    }

}