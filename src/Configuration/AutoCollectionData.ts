import {AutoCollectionConfigurationBase} from "./AutoCollectionConfiguration";

export interface AutoCollectionData {
    get(): any;
}


export class DefaultAutoCollectionData extends AutoCollectionConfigurationBase implements AutoCollectionData {

    get(): any {
        return this.getAutoCollection().getConfiguration().data;
    }

}

