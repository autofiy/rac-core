import React, {Component} from 'react';
import SimpleTableExample from "./SimpleTableExample";
import SimpleListExample from "./SimpleListExample";
import HttpFetcherExample from "./HttpFetcherExample";
import CustomPropertiesExample from "./CustomPropertiesExample";
import TitlesExample from "./TitlesExample";
import OrderExample from "./OrderExample";
import ExtraPropertiesExample from "./ExtraPropertiesExample";
import CustomCellExample from "./CustomCellExample";
import FullUseExample from "./FullUseExample";
import SearchWithMetadataUseOfCutomRendererExample from "./SearchWithMetadataUseOfCutomRendererExample";

export interface State {
    example?: string
}

class ExampleContainer extends Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {example: undefined};
    }

    render() {

        let exampleComponent = null;

        switch (this.state.example) {
            case "simple-table" :
                exampleComponent = <SimpleTableExample/>;
                break;
            case "simple-list":
                exampleComponent = <SimpleListExample/>;
                break;

            case "http-fetcher":
                exampleComponent = <HttpFetcherExample/>;
                break;
            case "custom-properties":
                exampleComponent = <CustomPropertiesExample/>;
                break;

            case "title-properties":
                exampleComponent = <TitlesExample/>;
                break;

            case "order-properties":
                exampleComponent = <OrderExample/>;
                break;

            case "extra-properties":
                exampleComponent = <ExtraPropertiesExample/>;
                break;

            case "custom-cell":
                exampleComponent = <CustomCellExample/>;
                break;

            case "full-use":
                exampleComponent = <FullUseExample/>;
                break;

            case "search":
                exampleComponent = <SearchWithMetadataUseOfCutomRendererExample/>
                break;
        }

        return (
            <div>
                <div>
                    <h1>Select Example</h1>
                    <button onClick={() => this.setExample("simple-table")}>Simple Table</button>
                    <button onClick={() => this.setExample("simple-list")}>Simple List</button>
                    <button onClick={() => this.setExample("http-fetcher")}>Http Fetcher</button>
                    <button onClick={() => this.setExample("custom-properties")}>Custom Properties</button>
                    <button onClick={() => this.setExample("order-properties")}>Order Properties</button>
                    <button onClick={() => this.setExample("title-properties")}>Titles Properties</button>
                    <button onClick={() => this.setExample("extra-properties")}>Extra Properties</button>
                    <button onClick={() => this.setExample("custom-cell")}>Custom Render Custom Render HeaderCell ,
                        BodyCell
                    </button>
                    <button onClick={() => this.setExample("full-use")}>Full Use</button>
                    <button onClick={() => this.setExample("search")}>Search</button>
                </div>

                <br/>
                <hr/>
                <br/>


                {
                    exampleComponent
                }

            </div>
        );
    }


    private setExample = (example: string) => {
        this.setState({example: example});
    }
}

export default ExampleContainer;