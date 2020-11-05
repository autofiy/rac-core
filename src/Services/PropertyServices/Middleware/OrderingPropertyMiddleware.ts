import {PropertyGeneratorMiddleware, PropertyMiddlewareReturnType} from "./PropertyGeneratorMiddleware";
import {Property} from "../PropertyGenerator";
import {PropertyOrdering} from "./Order/PropertyOrdering";

export class OrderingPropertyMiddleware implements PropertyGeneratorMiddleware {

    private readonly ordering: PropertyOrdering;

    constructor(ordering: PropertyOrdering) {
        this.ordering = ordering;
    }

    handle(properties: Property[]): PropertyMiddlewareReturnType {
        return this.ordering.handle(properties);
    }

}