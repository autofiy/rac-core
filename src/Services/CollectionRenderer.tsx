import {IAutoCollection} from "../AutoCollection/IAutoCollection";

export interface CollectionRenderer<Options> {

    render(): any;

}


export abstract class CollectionRendererBase<Options> implements CollectionRenderer<Options> {

    private readonly autoCollection: IAutoCollection;

    protected constructor(autoCollection: IAutoCollection) {
        this.autoCollection = autoCollection;
    }

    protected getAutoCollection(): IAutoCollection {
        return this.autoCollection;
    }

    protected getOptions(): Options {
        return this.autoCollection.getProps().extra?.renderOptions ?? {};
    }

    abstract render(): any;

}

