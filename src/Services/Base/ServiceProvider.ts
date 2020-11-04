import {ServiceConfiguration} from "../../AutoCollection/AutoCollectionProps";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {ServiceDefault} from "../../Default/ServiceDefault";

export interface IServiceProvider {
    getService<T = any>(key: keyof ServiceConfiguration, autoCollection: IAutoCollection): T;
}

export class ServiceProvider implements IServiceProvider {
    getService<T = any>(key: keyof ServiceConfiguration, autoCollection: IAutoCollection): T {
        let serviceCallback: any = autoCollection.getProps().services?.[key];
        if (serviceCallback) {
            return serviceCallback(autoCollection);
        }
        serviceCallback = ServiceDefault[key];
        return serviceCallback(autoCollection);
    }
}