import {IAutoCollection} from "../AutoCollection/IAutoCollection";
import {AutoCollectionData} from "./AutoCollectionData";
import {AutoCollectionEvent} from "./AutoCollectionEvent";
import {AutoCollectionDefault} from "../AutoCollectionDefault";

export interface AutoCollectionConfiguration {
    getAutoCollection(): IAutoCollection;
}


export class AutoCollectionConfigurationBase implements AutoCollectionConfiguration {

    private readonly autoCollection: IAutoCollection;

    constructor(autoCollection: IAutoCollection) {
        this.autoCollection = autoCollection;
    }

    getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

}

export interface AutoCollectionConfigurationService {
    data: (ac: IAutoCollection) => AutoCollectionData;
    event: (ac: IAutoCollection) => AutoCollectionEvent;
}

export function getConfiguration<T>(configurationKey: keyof AutoCollectionConfigurationService, autoCollection: IAutoCollection): T {
    const configurationService = autoCollection.getProps().configuration?.[configurationKey]
    if (configurationService) {
        return configurationService(autoCollection) as T;
    }
    return AutoCollectionDefault.configurationService?.[configurationKey](autoCollection) as T;
}