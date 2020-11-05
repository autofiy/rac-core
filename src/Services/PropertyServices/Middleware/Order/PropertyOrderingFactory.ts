import {PropertiesConfiguration} from "../../../../AutoCollection/AutoCollectionProps";
import {SimplePropertyOrdering} from "./SimplePropertyOrdering";
import {Property} from "../../PropertyGenerator";
import {CustomPropertyOrdering} from "./CustomPropertyOrdering";
import {NoPropertyOrdering} from "./NoPropertyOrdering";
import {PropertyOrdering} from "./PropertyOrdering";

export interface PropertyOrderingFactory {
    getOrdering(properties: Property[]): PropertyOrdering;
}

export class DefaultPropertyOrderingFactory implements PropertyOrderingFactory {

    private readonly configuration: PropertiesConfiguration;

    constructor(configuration: PropertiesConfiguration) {
        this.configuration = configuration;
    }

    getOrdering(): PropertyOrdering {
        const orderBy = this.configuration.orderBy;
        if (Array.isArray(orderBy)) {
            return new SimplePropertyOrdering(this.configuration);
        }

        if (typeof orderBy === "function") {
            return new CustomPropertyOrdering(this.configuration);
        }

        return new NoPropertyOrdering();
    }


}