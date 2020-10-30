import {Service, ServiceBase} from "../Base/Service";

export interface DataManager extends Service {
    get(): any;
}


export class DefaultAutoCollectionData extends ServiceBase implements DataManager {

    get(): any {
        return this.getAutoCollection().getConfiguration().data;
    }

}

