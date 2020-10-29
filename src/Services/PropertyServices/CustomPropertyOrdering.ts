import {ConfigurableOrderingBase} from "./PropertyOrder";
import {PropertiesConfiguration} from "../../AutoCollection/AutoCollectionProps";
import {Property} from "./PropertyGenerator";

export class CustomPropertyOrdering extends ConfigurableOrderingBase<PropertiesConfiguration> {

    getOrderedPropertiesName(): string[] {
        const orderBy = this.getConfiguration().orderBy as (properties: Property[]) => string[];
        return orderBy(this.properties);
    }

}