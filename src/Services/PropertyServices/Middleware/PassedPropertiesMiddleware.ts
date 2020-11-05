import {PropertyGeneratorMiddleware, PropertyMiddlewareReturnType} from "./PropertyGeneratorMiddleware";
import {Property} from "../PropertyGenerator";
import {PropertiesConfiguration} from "../../../AutoCollection/AutoCollectionProps";

export class PassedPropertiesMiddleware implements PropertyGeneratorMiddleware {

    private readonly configuration: PropertiesConfiguration;

    constructor(configuration: PropertiesConfiguration) {
        this.configuration = configuration;
    }

    handle(properties: Property[]): PropertyMiddlewareReturnType {
        let passedProperties = this.configuration.properties;
        if (passedProperties) {
            return {data: passedProperties, break: true};
        }
        return {data: []};
    }

}