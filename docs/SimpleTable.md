`SimpleTable` is predefined CollectionComponent, it purpose as the name suggest
is to display data in table.

the render options of this component is of type `TableRenderOptions` which extends `BaseCollectionRenderOptions`.

`TableRenderOptions` methods :


    getProperties(data: any) : Column[]    
    
    return the columns for the table. it will return passed columns that defined in the config
    if no columns provided in the config, it will try to figure out the columns based on the data.
    it takes the first item of the data and then take the keys and generate columns based on every key.
    first it will look if there is entry in `overrideColumns` in config
    if there was it append the entry to the generated column.
    if no entry found it will return simple column with only name and title
    the name is the value of the key , for the title it will also try to figure it out
    if the entry found in `titleMap` it will use that entry if not it use the key as title.
    
    but if the data was empty it will return empty array of the columns
                       
                                          
-----                   

    getHeaderRowClassName() : string
    return headerRowClassName if defined in the config, else empty string returned


-----
    
    
    getHeaderRowProps() : string
    return headerRowProps if defined in the config, else empty object returned
    
    
-----
    
        
    getRowClassName(item: any, index: number) : string
    
    return empty string if rowClassName is not provided in the config.
    if rowClassName then we check the type, it its function then we call the function and return it's return value
    if the type is string then we return it immediately 
    
    
----- 

    getRowProps(item: any, index: number) : string
    return rowProps if defined in the config, else empty object returned 
    

as we said that `TableRenderOptions` accept config of type `TableRenderOptions`,


    interface TableRenderOptionsConfig extends CollectionRenderOptionsConfig {
        columns?:               ColumnConfig[];
        titleMap?:              { [name: string]: string };
        overrideColumns?:       { [name: string]: ColumnConfig };
    
    
        headerRowClassName?:    string;
        headerRowProps?:        any;
    
        rowClassName?:          string | ((item: any, index: number) => any);
        rowProps?:              any;
    }
    



------


### Column

