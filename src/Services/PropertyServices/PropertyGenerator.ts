import {PropertiesConfiguration} from "../../AutoCollection/AutoCollectionProps";
import {IAutoCollection} from "../../AutoCollection/IAutoCollection";
import {AutoCollectionDefault} from "../../Default/AutoCollectionDefault";
import {PropertyGeneratorMiddleware} from "./Middleware/PropertyGeneratorMiddleware";
import {PassedPropertiesMiddleware} from "./Middleware/PassedPropertiesMiddleware";
import {TitleMapperPropertyMiddleware} from "./Middleware/TitleMapperPropertyMiddleware";
import {ExtraPropertiesMiddleware} from "./Middleware/ExtraPropertiesMiddleware";
import {OrderingPropertyMiddleware} from "./Middleware/OrderingPropertyMiddleware";
import {DefaultPropertyOrderingFactory} from "./Middleware/Order/PropertyOrderingFactory";

export interface Property {
    name: string;
    title: string;
}

export interface PropertyGenerator {
    generate(): Property[];
}

export abstract class PropertyGeneratorBase implements PropertyGenerator {

    private readonly configurations: PropertiesConfiguration;
    private readonly autoCollection: IAutoCollection;

    public constructor(autoCollection: IAutoCollection) {
        this.autoCollection = autoCollection;
        this.configurations = autoCollection.getProps().properties ?? AutoCollectionDefault.defaultPropertiesConfiguration;
    }

    protected getOptions(): PropertiesConfiguration {
        return this.configurations;
    }

    generate(): Property[] {
        const middlewareArr = this.getMiddlewareArray();
        let data: Property[] = [];
        for (let middleware of middlewareArr) {
            const result = middleware.handle(data);
            data = result.data;
            if (result.break) {
                break;
            }
        }
        return data;
    }


    protected getRow(): any {
        let data = this.autoCollection.data().get();
        if (!data || data.length === 0) {
            return {};
        }
        return data[0];
    }

    protected abstract getMiddlewareArray(): PropertyGeneratorMiddleware[];

}

export class SmartPropertyGenerator extends PropertyGeneratorBase {

    protected getMiddlewareArray(): PropertyGeneratorMiddleware[] {
        const configuration = this.getOptions();
        const orderingFactory = new DefaultPropertyOrderingFactory(configuration);
        return [
            new PassedPropertiesMiddleware(configuration),
            new TitleMapperPropertyMiddleware(this.getRow(), configuration),
            new ExtraPropertiesMiddleware(configuration),
            new OrderingPropertyMiddleware(orderingFactory.getOrdering()),
        ];
    }


}
