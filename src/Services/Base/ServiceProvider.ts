import {ServiceConfiguration} from "../../AutoCollection/AutoCollectionProps";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {ServiceDefault} from "../../Default/ServiceDefault";

export interface IServiceProvider {
    getService<T = any>(key: keyof ServiceConfiguration, autoCollection: IAutoCollection , defaultService?: () => T | undefined): T;
}

export class ServiceProvider implements IServiceProvider {
    getService<T = any>(key: keyof ServiceConfiguration, autoCollection: IAutoCollection, defaultService?: () => T | undefined): T {
        let serviceCallback: any = autoCollection.getProps().services?.[key];
        if (serviceCallback) {
            return serviceCallback(autoCollection);
        }

        if (defaultService) {
            const service = defaultService();
            if (service) {
                return service;
            }
        }

        serviceCallback = ServiceDefault[key];
        return serviceCallback(autoCollection);
    }
}