import {Property} from "../Collection/CollectionProperties";

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