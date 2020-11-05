import {PropertyOrderingBase} from "./PropertyOrdering";
import {Property} from "../../PropertyGenerator";

export class NoPropertyOrdering extends PropertyOrderingBase {

    getOrderedPropertiesName(properties: Property[]): string[] {
        return properties.map(p => p.name);
    }


}