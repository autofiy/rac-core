import {Property} from "../PropertyGenerator";

export type PropertyMiddlewareReturnType = { break?: boolean, data: Property[] };

export interface PropertyGeneratorMiddleware {
    handle(properties: Property[]): PropertyMiddlewareReturnType;
}



