import {PropertyGeneratorMiddleware, PropertyMiddlewareReturnType} from "./PropertyGeneratorMiddleware";
import {Property} from "../PropertyGenerator";

export class AutoDetectPropertiesMiddleware implements PropertyGeneratorMiddleware {

    private readonly dataItem: any;

    constructor(dataItem: any) {
        this.dataItem = dataItem;
    }

    handle(properties: Property[]): PropertyMiddlewareReturnType {
        const keys = Object.keys(this.dataItem);
        const data = properties.concat(keys.map(key => ({name: key, title: key})));
        return {data: data};
    }

}