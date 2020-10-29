import {ConfigurableOrderingBase} from "./PropertyOrder";
import {PropertiesConfiguration} from "../../AutoCollection/AutoCollectionProps";

export class SimplePropertyOrdering extends ConfigurableOrderingBase<PropertiesConfiguration> {
    getOrderedPropertiesName(): string[] {
        return this.getConfiguration().orderBy as string[];
    }
}
