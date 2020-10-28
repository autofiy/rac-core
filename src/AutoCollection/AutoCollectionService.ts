import {AutoCollectionServices} from "./AutoCollectionProps";
import {IAutoCollection} from "./IAutoCollection";
import {AutoCollectionDefault} from "../AutoCollectionDefault";

export function getService<T = any>(key: keyof AutoCollectionServices, autoCollection: IAutoCollection): T {
    let serviceCallback: any = autoCollection.getProps().services?.[key];
    if (serviceCallback) {
        return serviceCallback(autoCollection);
    }
    serviceCallback = AutoCollectionDefault.services[key];
    return serviceCallback(autoCollection);
}