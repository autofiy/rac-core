import {PropertyOrder} from "../Property/PropertyOrder";
import {PropertiesConfiguration} from "../AutoCollection/AutoCollectionProps";

export interface Property {
    name: string;
    title: string;
}

export interface CollectionProperties {

    getProperties(): Property[];

}


export class DefaultCollectionProperties implements CollectionProperties {

    private readonly data: any[];
    private readonly configurations: PropertiesConfiguration;

    constructor(data: any[], configurations: PropertiesConfiguration) {
        this.data = data;
        this.configurations = configurations;
    }

    getOptions(): PropertiesConfiguration {
        return this.configurations;
    }

    getProperties(): Property[] {
        let properties: Property[] | undefined = this.getOptions().properties;
        if (properties) {
            return properties;
        }

        const options = this.getOptions();
        const someRow = this.getRow();
        const keys = Object.keys(someRow);
        properties = [];
        keys.forEach(key => {
            const property = {title: key, name: key};
            if (options.titles?.[key]) {
                property.title = options.titles?.[key];
            }
            properties!.push(property);
        });
        if (options.extraProperties) {
            properties = properties.concat(options.extraProperties);
        }
        return new PropertyOrder(properties, options.orderBy).order();
    }

    getRow(): any {
        if (this.data.length === 0) {
            return {};
        }
        return this.data[0];
    }


}