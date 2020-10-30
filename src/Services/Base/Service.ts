import {IAutoCollection} from "../../AutoCollection/IAutoCollection";

export interface Service {
    getAutoCollection(): IAutoCollection;
}


export class ServiceBase implements Service {

    private readonly autoCollection: IAutoCollection;

    constructor(autoCollection: IAutoCollection) {
        this.autoCollection = autoCollection;
    }

    getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

}

export type ServiceCallback<T> = (ac: IAutoCollection) => T;


