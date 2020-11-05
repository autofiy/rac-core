import {PropertiesConfiguration} from "../../../../AutoCollection/AutoCollectionProps";
import {ConfigurableOrderingBase} from "./PropertyOrdering";
import {Property} from "../../PropertyGenerator";

export class SimplePropertyOrdering extends ConfigurableOrderingBase<PropertiesConfiguration> {
    getOrderedPropertiesName(properties: Property[]): string[] {
        return this.getConfiguration().orderBy as string[];
    }
}
