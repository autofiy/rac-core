
import {PropertiesConfiguration} from "../../../../AutoCollection/AutoCollectionProps";
import {Property} from "../../PropertyGenerator";
import {ConfigurableOrderingBase} from "./PropertyOrdering";

export class CustomPropertyOrdering extends ConfigurableOrderingBase<PropertiesConfiguration> {

    getOrderedPropertiesName(properties: Property[]): string[] {
        const orderBy = this.getConfiguration().orderBy as (properties: Property[]) => string[];
        return orderBy(properties);
    }

}