import {Autofiyable, AutofiyableProps, AutofiyableServiceBase, ServiceConfiguration} from "@autofiy/autofiyable";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";


export class ServiceBase extends AutofiyableServiceBase {

    private readonly autoCollection: IAutoCollection;

    constructor(autoCollection: IAutoCollection) {
        super(autoCollection);
        this.autoCollection = autoCollection;
    }

    getAutofiyable(): Autofiyable<ServiceConfiguration, AutofiyableProps<ServiceConfiguration, any>> {
        return this.autoCollection;
    }

    getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

}


