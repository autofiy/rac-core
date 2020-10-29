import {PropertyOrdering} from "./PropertyOrder";
import {PropertiesConfiguration} from "../../AutoCollection/AutoCollectionProps";
import {SimplePropertyOrdering} from "./SimplePropertyOrdering";
import {Property} from "./PropertyGenerator";
import {CustomPropertyOrdering} from "./CustomPropertyOrdering";

export interface PropertyOrderingFactory {
    getOrdering(properties : Property[]): PropertyOrdering;
}

export class DefaultPropertyOrderingFactory implements PropertyOrderingFactory {

    private configuration  : PropertiesConfiguration;

    constructor(configuration: PropertiesConfiguration) {
        this.configuration = configuration;
    }

    getOrdering(properties : Property[]): PropertyOrdering {
        const orderBy = this.configuration.orderBy;
        if (Array.isArray(orderBy)){
            return new SimplePropertyOrdering(properties , this.configuration);
        }

        if (typeof orderBy === "function"){
            return new CustomPropertyOrdering(properties , this.configuration);
        }


        return new NoPropertyOrdering(properties);
    }



}