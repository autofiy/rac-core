import React, {Component} from 'react';
import {AutoCollection} from "../AutoCollection/AutoCollection";
import {SimpleTable} from "../CollectionComponent/Table/SimpleTable";
import {DirectDataFetcher} from "../Services/Fetcher/DirectDataFetcher";

class ExtraPropertiesExample extends Component {
    render() {
        const data = [
            {id: 1, name: 'Ali Faris', year: '1993'},
            {id: 2, name: 'Huda Sajed', year: '1994'},
            {id: 3, name: 'Fatima Ali', year: '2015'},
            {id: 4, name: 'Mohammed Ali', year: '2019'},
        ];
        return (
            <AutoCollection as={SimpleTable}
                            services={{fetcher: ac => new DirectDataFetcher(ac)}}
                            properties={{
                                extraProperties: [{name: 'action', title: 'Action'}],
                                render: {
                                    action: (property, data, autoCollection) => <td>
                                        <button onClick={() => {
                                            const message = property.title + "\n" + JSON.stringify(data) + "\n" + autoCollection.data().get().length
                                            alert(message);
                                        }}>ACTION
                                        </button>
                                    </td>
                                }
                            }}
                            extra={{
                                dataSourceOptions: {data: data},
                            }}/>
        );
    }
}

export default ExtraPropertiesExample;