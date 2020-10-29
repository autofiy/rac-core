import {Property} from "./PropertyGenerator";

export interface PropertyOrdering {
    order(): Property[];
}

export interface ConfigurablePropertyOrdering<Configuration> extends PropertyOrdering {
    getConfiguration(): Configuration;
}

export abstract class PropertyOrderingBase implements PropertyOrdering {

    protected properties: Property[];

    constructor(properties: Property[]) {
        this.properties = properties;
    }

    order(): Property[] {
        const orderByArray = this.getOrderedPropertiesName();
        const orderedProperties = [];
        for (let name of orderByArray) {
            orderedProperties.push(this.getPropertyByName(name));
        }
        return orderedProperties;
    }

    abstract getOrderedPropertiesName(): string[] ;

    protected getPropertyByName(name: string): Property {
        for (let property of this.properties) {
            if (property.name === name) {
                return property;
            }
        }
        throw Error(`Cannot find property ${name}`);
    }

}


export abstract class ConfigurableOrderingBase<Configuration> extends PropertyOrderingBase implements ConfigurablePropertyOrdering<Configuration> {
    protected configuration: Configuration;

    constructor(properties: Property[], configuration: Configuration) {
        super(properties);
        this.configuration = configuration;
    }

    getConfiguration(): Configuration {
        return this.configuration;
    }
}

export class PropertyOrder {
    protected readonly properties: Property[];
    protected readonly orderBy?: string[] | ((properties: Property[]) => string[]);

    constructor(properties: Property[],
                orderBy?: string[] | ((properties: Property[]) => string[])
    ) {
        this.properties = properties;
        this.orderBy = orderBy;
    }

    public order(): Property[] {
        const orderByArray = this.getOrderByArray();
        const orderedProperties = [];
        for (let name of orderByArray) {
            orderedProperties.push(this.getPropertyByName(name));
        }
        return orderedProperties;
    }

    protected getPropertyByName(name: string): Property {
        for (let property of this.properties) {
            if (property.name === name) {
                return property;
            }
        }
        throw Error(`Cannot find property ${name}`);
    }

    protected getOrderByArray(): string[] {
        const order = this.orderBy;
        if (Array.isArray(order))
            return order;
        else if (typeof order === "function")
            return order(this.properties);
        return this.noOrder();
    }

    private noOrder() {
        return this.properties.map(property => property.name);
    }
}