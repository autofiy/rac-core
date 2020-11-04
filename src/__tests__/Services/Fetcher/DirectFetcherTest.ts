import {DirectDataFetcher} from "../../../Services/Fetcher/DirectDataFetcher";
import {mock} from "jest-mock-extended";
import {IAutoCollection} from "../../../AutoCollection/IAutoCollection";
import {AutoCollectionProps} from "../../../AutoCollection/AutoCollectionProps";

describe('DirectFetcher', () => {

    it('should not update state when fetch start', function () {
        const autoCollection = mock<IAutoCollection>({
            getProps(): AutoCollectionProps {
                return {} as any;
            }
        });
        const fetcher = new DirectDataFetcher(autoCollection);
        fetcher.fetch();
        expect(autoCollection.updateConfiguration).not.toBeCalled();
    });

    it('should not update state when fetch start', function () {
        const autoCollection = mock<IAutoCollection>({
            getProps(): AutoCollectionProps {
                return {} as any;
            }
        });
        const fetcher = new DirectDataFetcher(autoCollection);
        fetcher.fetch();
        expect(autoCollection.updateConfiguration).not.toBeCalled();
    });


    it('should update data from configuration when done fetching', async function () {
        const data: any [] = [{}, {}];
        const autoCollection = mock<IAutoCollection>({
            getProps(): AutoCollectionProps {
                return {
                    extra: {
                        dataSourceOptions: {
                            data: data
                        }
                    }
                } as any;
            }
        });
        const fetcher = new DirectDataFetcher(autoCollection);
        await fetcher.fetch();

        expect(autoCollection.updateConfiguration).toBeCalledWith({
            loading: false,
            error: null,
            data: data
        });

    });

    it('should update empty array when data not supplied in data source options done fetching', async function () {
        const autoCollection = mock<IAutoCollection>({
            getProps(): AutoCollectionProps {
                return {} as any;
            }
        });
        const fetcher = new DirectDataFetcher(autoCollection);
        await fetcher.fetch();

        expect(autoCollection.updateConfiguration).toBeCalledWith({
            loading: false,
            error: null,
            data: []
        });

    });


});