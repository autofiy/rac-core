import {mock} from "jest-mock-extended";
import {IAutoCollection} from "../../../AutoCollection/IAutoCollection";
import {HttpDataFetcher} from "../../../Services/Fetcher/HttpDataFetcher";
import fetchMock from "jest-fetch-mock";
import {AutoCollectionDefault} from "../../../Default/AutoCollectionDefault";
import {EventManager} from "../../../Services/EventManager/EventManager";

fetchMock.enableMocks();

describe('HttpDataFetcher', () => {

    it('should change state when fetching start', function () {
        const autoCollection = mock<IAutoCollection>({
            getProps: () => ({} as any), event(): EventManager {
                return mock<EventManager>();
            }
        });
        const responseMock: any = () => {
            return {
                status: 200,
                body: []
            }
        };
        fetchMock.mockIf("*", responseMock);
        const fetcher = new HttpDataFetcher(autoCollection);
        fetcher.fetch();
        expect(autoCollection.updateState).toBeCalledWith({
            data: AutoCollectionDefault.initialData,
            loading: true,
            error: null,
        });
    });


    it('should change state when fetching done', async function () {
        const autoCollection = mock<IAutoCollection>({
            getProps: () => ({
                extra: {dataSourceOptions: {url: 'http://localhost'}}
            } as any),
            event(): EventManager {
                return mock<EventManager>();
            }
        });
        let response = [{}, {}];
        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(JSON.stringify(response));
        const fetcher = new HttpDataFetcher(autoCollection);
        await fetcher.fetch();
        expect(autoCollection.updateState.mock.calls).toEqual([
            [{data: AutoCollectionDefault.initialData, loading: true, error: null}],
            [{data: response, loading: false, error: null, all: response, filtered: false}, expect.anything()]
        ]);
    });


    it('should change state when fetching fail', async function () {
        const autoCollection = mock<IAutoCollection>({
            getProps: () => ({
                extra: {dataSourceOptions: {url: 'http://localhost'}}
            } as any),
            event(): EventManager {
                return mock<EventManager>();
            }
        });
        fetchMock.resetMocks();
        fetchMock.mockReject(() => Promise.reject('failure'));
        const fetcher = new HttpDataFetcher(autoCollection);
        try {
            await fetcher.fetch();
        } catch {
            expect(autoCollection.updateState.mock.calls).toEqual([
                [{data: AutoCollectionDefault.initialData, loading: true, error: null}],
                [{data: AutoCollectionDefault.initialData, loading: false, error: 'failure'}]
            ]);
        }
    });

});