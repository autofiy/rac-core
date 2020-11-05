import {IAutoCollection} from "../AutoCollection/IAutoCollection";
import {SmartPropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";
import {DefaultAutoCollectionData} from "../Services/DataManager/DataManager";
import {DefaultEventManager} from "../Services/EventManager/EventManager";
import {ServiceConfiguration} from "../AutoCollection/AutoCollectionProps";
import {IServiceProvider, ServiceProvider} from "../Services/Base/ServiceProvider";
import {DirectDataFetcher} from "../Services/Fetcher/DirectDataFetcher";
import {SimpleCollectionRenderer} from "../Services/Renderer/SimpleCollectionRenderer";
import {ServiceCallback} from "../Services/Base/Service";


export const ServiceDefault: ServiceConfiguration & { serviceProvider: ServiceCallback<IServiceProvider> } = {
    fetcher: (ac: IAutoCollection) => new DirectDataFetcher(ac),
    renderer: (ac: IAutoCollection) => new SimpleCollectionRenderer(ac),
    propertyGenerator: (ac: IAutoCollection) => new SmartPropertyGenerator(ac),
    dataManager: ac => new DefaultAutoCollectionData(ac),
    eventManager: ac => new DefaultEventManager(ac),
    serviceProvider: () => new ServiceProvider(),
}
