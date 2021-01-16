import React, {Component} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";
import {SimpleTable} from "../CollectionComponent/Table/SimpleTable";
import {EventType} from "../Services/EventManager/EventType";
import {IAutoCollection} from "../AutoCollection/IAutoCollection";
import {HttpDataFetcher} from "../Services/Fetcher/HttpDataFetcher";

interface State {
    log: string;
}

class FullUseExample extends Component<any, State> {

    private ac: IAutoCollection = null as any;

    constructor(props: any) {
        super(props);
        this.state = {log: ""};
    }

    render() {
        return (
            <div>

                <hr/>

                <h1>Full Use Example</h1>
                <h3>Options</h3>

                <button onClick={() => this.ac.data().insertFirst({id: 0, name: "ADDED FIRST", year: 2020})}>ADD FIRST
                </button>
                <button onClick={() => this.ac.data().insertLast({id: 0, name: "ADDED LAST", year: 2020})}>ADD LAST
                </button>
                <button onClick={() => {
                    const index = prompt("Enter Index");
                    this.ac.data().insertAt(parseInt(index ?? "0"), {
                        id: 0,
                        name: `ADDED AT INDEX : ${index}`,
                        year: 2020
                    });
                }}>
                    ADD AT
                </button>
                <button onClick={() => {
                    const index = prompt("Enter Index");
                    this.ac.data().removeAt(parseInt(index ?? "0"));
                }}>
                    REMOVE AT
                </button>
                <button onClick={() => {
                    const index = prompt("Enter Index");
                    this.ac.data().updateItemAt(parseInt(index ?? "0"), {
                        id: 0,
                        name: `UPDATED AT INDEX  : ${index}`,
                        year: 2020
                    });
                }}>
                    UPDATE AT
                </button>
                <button onClick={() => {
                    this.ac.data().filter(item => parseInt(item.year) % 2 === 0);
                }}>
                    FILTER
                </button>
                <button onClick={() => {
                    this.ac.data().order(items => items.reverse());
                }}>
                    ORDER
                </button>
                <button onClick={() => {
                    this.ac.data().clearFilter();
                }}>
                    CLEAR FILTER
                </button>

                <AutoCollection ref={ac => this.ac = (ac as any)}
                                as={SimpleTable}
                                services={{fetcher: ac => new HttpDataFetcher(ac)}}
                                extra={{dataSourceOptions: {url: 'http://localhost:9000'}}}
                                properties={{
                                    orderBy: ["year", "name"],
                                }}
                                on={{
                                    [EventType.FETCH_START]: (_, data) => this.log(EventType.FETCH_START, data),
                                    [EventType.FETCH_FAIL]: (_, data) => this.log(EventType.FETCH_FAIL, data),
                                    [EventType.FETCH_DONE]: (_, data) => this.log(EventType.FETCH_DONE, data),

                                    [EventType.DATA_FILTERED]: (_, data) => this.log(EventType.DATA_FILTERED, data),
                                    [EventType.DATA_REORDERED]: (_, data) => this.log(EventType.DATA_REORDERED, data),
                                    [EventType.DATA_FILTER_CLEARED]: (_, data) => this.log(EventType.DATA_FILTER_CLEARED, data),

                                    [EventType.ITEM_ADDED]: (_, data) => this.log(EventType.ITEM_ADDED, data),
                                    [EventType.ITEM_MODIFIED]: (_, data) => this.log(EventType.ITEM_MODIFIED, data),
                                    [EventType.ITEM_REMOVED]: (_, data) => this.log(EventType.ITEM_REMOVED, data),
                                }}
                />


                <p style={{padding: 16, background: "black", color: "white", fontSize: 16, whiteSpace: "pre-wrap"}}>
                    {this.state.log}
                </p>

            </div>
        );
    }

    private log = (type: string, data: any) => {
        const {log} = this.state;
        let newLog = "\n" +
            type + "\n" +
            this.getLogDataAsString(data) + "\n" +
            "--------------------------------------------------------" +
            "\n";

        this.setState({log: log + newLog});
    }

    private getLogDataAsString(data: any) {
        try {
            return JSON.stringify(data);
        } catch {
            return String(data);
        }
    }
}

export default FullUseExample;