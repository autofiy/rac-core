import {PropertiesConfiguration} from "../../AutoCollection/AutoCollectionProps";
import {PropertyOrder} from "./PropertyOrder";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {AutoCollectionDefault} from "../../AutoCollectionDefault";

export interface Property {
    name: string;
    title: string;
}

export interface PropertyGenerator {
    generate(): Property[];
}


export class SmartPropertyGenerator implements PropertyGenerator {

    private readonly configurations: PropertiesConfiguration;
    private readonly autoCollection: IAutoCollection;

    constructor(autoCollection: IAutoCollection) {
        this.autoCollection = autoCollection;
        this.configurations = autoCollection.getProps().properties ?? AutoCollectionDefault.defaultPropertiesConfiguration;
    }

    getOptions(): PropertiesConfiguration {
        return this.configurations;
    }

    generate(): Property[] {
        let passedProperties = this.getOptions().properties;
        if (passedProperties) {
            return passedProperties;
        }
        return this.smartGenerate();
    }

    private smartGenerate() {
        const someRow = this.getRow();
        let properties = this.mapTitles(someRow);
        properties = this.appendExtra(properties);
        return this.order(properties)
    }

    private mapTitles(data: any) {
        const keys = Object.keys(data);
        const options = this.getOptions();
        const properties: Property[] = [];
        keys.forEach(key => {
            const property = {title: key, name: key};
            if (options.titles?.[key]) {
                property.title = options.titles?.[key];
            }
            properties!.push(property);
        });
        return properties;
    }

    private order(properties: Property[]) {
        let orderService = new PropertyOrder(properties, this.getOptions().orderBy);
        return orderService.order();
    }

    private appendExtra(properties: Property[]) {
        const options = this.getOptions();
        if (options.extraProperties) {
            return properties.concat(options.extraProperties);
        }
        return properties;
    }


    getRow(): any {
        let data = this.autoCollection.data().get();
        if (!data || data.length === 0) {
            return {};
        }
        return data[0];
    }

}
