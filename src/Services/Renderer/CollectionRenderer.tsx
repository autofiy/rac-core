import {Service} from "@autofiy/autofiyable";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";

export interface CollectionRenderer extends Service {

    render(): any;

}


export abstract class CollectionRendererBase<Options> implements CollectionRenderer {

    private readonly autoCollection: IAutoCollection;

    protected constructor(autoCollection: IAutoCollection) {
        this.autoCollection = autoCollection;
    }

    abstract render(): any;

    protected getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

    protected getOptions(): Options {
        return this.autoCollection.getProps().extra?.renderOptions ?? {};
    }

}

