import {PropertyGeneratorMiddleware, PropertyMiddlewareReturnType} from "./PropertyGeneratorMiddleware";
import {Property} from "../PropertyGenerator";
import {PropertiesConfiguration} from "../../../AutoCollection/AutoCollectionProps";

export class ExtraPropertiesMiddleware implements PropertyGeneratorMiddleware {

    private readonly configuration: PropertiesConfiguration;

    constructor(configuration: PropertiesConfiguration) {
        this.configuration = configuration;
    }

    handle(properties: Property[]): PropertyMiddlewareReturnType {
        let extraProperties = this.configuration.extraProperties;
        if (extraProperties) {
            return {data: properties.concat(extraProperties)};
        }
        return {data: properties};
    }

}