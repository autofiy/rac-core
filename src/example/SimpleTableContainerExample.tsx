import React, {Component} from 'react';
import {IndexedKeyExtractor} from "../KeyExtractor/KeyExtractor";
import {TableRenderOptions} from "../Config/Table/TableRenderOption";
import SimpleTableContainer from "../Container/SimpleTableContainer";
import {AxiosDataSource} from "../DataSource/AxiosDataSource";

class SimpleTableContainerExample extends Component {
    render() {
        const options = new TableRenderOptions({
            overrideColumns: {
                name: {
                    name: 'name', title: 'Nm', renderCell: value => <td>{String(value).toUpperCase()}</td>
                }
            },
            titleMap: {link: 'Action'}
        });

        return (
            <div>
                <h1>Simple Table Container Example : </h1>
                <SimpleTableContainer collectionOptions={options}
                                      dataSource={new AxiosDataSource({
                                          url: 'https://api.npoint.io/b8cab438591b6a238751',
                                          method: 'get'
                                      })}
                                      renderLoading={() => <h1>Loading...</h1>}
                                      renderError={() => <h1 style={{color: 'red'}}>Fail To Fetch Data</h1>}
                                      keyExtractor={new IndexedKeyExtractor()}/>
            </div>
        );
    }
}

export default SimpleTableContainerExample;