import {PropertyGeneratorMiddleware, PropertyMiddlewareReturnType} from "./PropertyGeneratorMiddleware";
import {Property} from "../PropertyGenerator";
import {PropertiesConfiguration} from "../../../AutoCollection/AutoCollectionProps";

export class TitleMapperPropertyMiddleware implements PropertyGeneratorMiddleware {

    private readonly data: any;
    private configuration: PropertiesConfiguration;

    public constructor(data: any, configuration: PropertiesConfiguration) {
        this.data = data;
        this.configuration = configuration;
    }

    handle(properties: Property[]): PropertyMiddlewareReturnType {
        const keys = Object.keys(this.data);
        const newProperties = this.mapTitles(keys);
        return {data: newProperties};
    }

    private mapTitles(keys: string[]) {
        return keys.map(key => {
            const property = {title: key, name: key};
            if (this.configuration.titles?.[key]) {
                property.title = this.configuration.titles?.[key];
            }
            return property;
        });
    }
}