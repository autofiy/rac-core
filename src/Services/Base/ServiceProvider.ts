import {ServiceConfiguration} from "../../AutoCollection/AutoCollectionProps";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {AutoCollectionDefault} from "../../AutoCollectionDefault";

export interface IServiceProvider {
    getService<T = any>(key: keyof ServiceConfiguration, autoCollection: IAutoCollection): T;
}

export class ServiceProvider implements IServiceProvider {
    getService<T = any>(key: keyof ServiceConfiguration, autoCollection: IAutoCollection): T {
        let serviceCallback: any = autoCollection.getProps().services?.[key];
        if (serviceCallback) {
            return serviceCallback(autoCollection);
        }
        serviceCallback = AutoCollectionDefault.services[key];
        return serviceCallback(autoCollection);
    }
}