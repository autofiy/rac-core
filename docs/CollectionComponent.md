`CollectionComponent ` is interface that should be implemented by components
that used to display collection of data.

    interface CollectionComponent<ItemDataType, RenderOptions> {
        render(): any;
    
        getData(): ItemDataType[];
    
        getRenderOptions(): RenderOptions;
    }
    
    
we provide abstract component(abstract class) that have basic props, 
you can extends this component to develop your own custom **CollectionContainer**


    interface BaseCollectionComponentProps<ItemDataType, RenderOptions> {
        data: ItemDataType[];
        keyExtractor: KeyExtractor;
        renderOptions: RenderOptions;
    }


BaseCollectionComponent

    abstract class BaseCollectionComponent<ItemDataType, RenderOptions,
        Props extends BaseCollectionComponentProps<ItemDataType, RenderOptions>, State>
        extends React.Component<Props, State>
        implements CollectionComponent<ItemDataType, RenderOptions> {



BaseCollectionComponent is generic component, when you extends `BaseCollectionComponent`
you should set these variable types

    ItemDataType    : is the type of single item of the data, example object,string,...
    
    RenderOptions   : is the type of render options that the component will receive 
    
    Props           : the type of the props that component will receive
                      note that the props should implements `BaseCollectionComponentProps` interface
    
    State           : the type of the state that the component will have.
                      we prefer that these type of components should not have state
                      
                     
BaseCollectionComponent have these methods : 


    getData() : ItemDataType[]          => return the passed data
    
    getRenderOptions() : RenderOptions  => return the passed render otions 