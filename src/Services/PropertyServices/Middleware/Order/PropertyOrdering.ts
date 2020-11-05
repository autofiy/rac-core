import {Property} from "../../PropertyGenerator";
import {PropertyGeneratorMiddleware, PropertyMiddlewareReturnType} from "../PropertyGeneratorMiddleware";

export interface PropertyOrdering extends PropertyGeneratorMiddleware {

}

export interface ConfigurablePropertyOrdering<Configuration> extends PropertyOrdering {
    getConfiguration(): Configuration;
}

export abstract class PropertyOrderingBase implements PropertyOrdering {

    handle(properties: Property[]): PropertyMiddlewareReturnType {
        const orderByArray = this.getOrderedPropertiesName(properties);
        const orderedProperties = [];
        for (let name of orderByArray) {
            const property = properties.find(p => p.name === name);
            if (property) {
                orderedProperties.push(property);
            }
        }
        return {data: orderedProperties};
    }

    abstract getOrderedPropertiesName(properties: Property[]): string[] ;
}


export abstract class ConfigurableOrderingBase<Configuration> extends PropertyOrderingBase implements ConfigurablePropertyOrdering<Configuration> {
    protected configuration: Configuration;

    constructor(configuration: Configuration) {
        super();
        this.configuration = configuration;
    }

    getConfiguration(): Configuration {
        return this.configuration;
    }
}