import {PropertyGeneratorMiddleware, PropertyMiddlewareReturnType} from "./PropertyGeneratorMiddleware";
import {Property} from "../PropertyGenerator";
import {PropertiesConfiguration} from "../../../AutoCollection/AutoCollectionProps";

export class TitleMapperPropertyMiddleware implements PropertyGeneratorMiddleware {

    private configuration: PropertiesConfiguration;

    public constructor(configuration: PropertiesConfiguration) {
        this.configuration = configuration;
    }

    handle(properties: Property[]): PropertyMiddlewareReturnType {
        const newProperties = properties.map(property => {
            if (this.configuration.titles?.[property.name]) {
                property.title = this.configuration.titles?.[property.name];
            }
            return {...property};
        });
        return {data: newProperties};
    }


}