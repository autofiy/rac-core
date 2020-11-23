import {mock} from "jest-mock-extended";
import {IAutoCollection} from "../../../AutoCollection/IAutoCollection";
import {DefaultDataManager} from "../../../Services/DataManager/DataManager";
import {AutoCollectionState} from "../../../AutoCollection/AutoCollectionProps";
import {EventManager} from "../../../Services/EventManager/EventManager";
import {EventType} from "../../../Services/EventManager/EventType";

describe('DataManagerTest', () => {

    function makeManagerInstance(state: Partial<AutoCollectionState>, autoCollectionImplementation: Partial<IAutoCollection> = {}) {
        state = {loading: false, filtered: false, all: [], data: [], error: null, ...state};
        let mockedEvent = mock<EventManager>();
        const autoCollection = mock<IAutoCollection>({
            getState(): AutoCollectionState {
                return state as any;
            },
            event(): EventManager {
                return mockedEvent;
            },
            ...autoCollectionImplementation
        });
        const manager = new DefaultDataManager(autoCollection);
        return {manager, autoCollection};
    }

    it('should return data', function () {
        const {manager} = makeManagerInstance({all: [{}, {}], data: [{}]});
        const data = manager.get();
        expect(data).toEqual([{}]);
    });

    it('should set data', function () {
        const {manager, autoCollection} = makeManagerInstance({data: [], all: []});
        const afterChange = jest.fn();
        manager.set([{}, {}], afterChange);
        expect(autoCollection.updateState).toBeCalledWith({
            filtered: false, data: [{}, {}], all: [{}, {}]
        }, afterChange);
    });

    it('should clear filter', function () {
        const {manager, autoCollection} = makeManagerInstance({all: [{}, {}], data: [{}], filtered: true});
        const afterChange = jest.fn();
        manager.clearFilter(afterChange);
        expect(autoCollection.updateState).toBeCalledWith({
            data: [{}, {}],
            filtered: false
        }, afterChange);
        expect(autoCollection.event().emit).toBeCalledWith(EventType.DATA_FILTER_CLEARED, {});
    });

    it('should filter data', function () {
        const {manager, autoCollection} = makeManagerInstance({
            all: [{x: true}, {x: true}, {}],
            data: [{}, {}, {}],
            filtered: false
        });
        const afterChange = jest.fn();
        manager.filter(item => item.x === true, afterChange);
        expect(autoCollection.updateState).toBeCalledWith({
            data: [{x: true}, {x: true}],
            filtered: true
        }, afterChange);
        expect(autoCollection.event().emit).toBeCalledWith(EventType.DATA_FILTERED, [{x: true}, {x: true}]);
    });

    it('should insert at index', function () {
        const {manager, autoCollection} = makeManagerInstance({data: [], all: [{x: true}, {y: true}, {z: true}]});
        const afterChange = jest.fn();
        manager.insertAt(1, {new: true}, afterChange);
        expect(autoCollection.updateState).toBeCalledWith({
            all: [{x: true}, {new: true}, {y: true}, {z: true}],
            data: [{x: true}, {new: true}, {y: true}, {z: true}],
            filtered : false
        }, afterChange);
        expect(autoCollection.event().emit).toBeCalledWith(EventType.ITEM_ADDED, {index: 1, item: {new: true}});
    });

    it('should insert first', function () {
        const {manager, autoCollection} = makeManagerInstance({data: [], all: [{x: true}, {y: true}, {z: true}]});
        const afterChange = jest.fn();
        manager.insertFirst({new: true}, afterChange);
        expect(autoCollection.updateState).toBeCalledWith({
            all: [{new: true}, {x: true}, {y: true}, {z: true}],
            data: [{new: true}, {x: true}, {y: true}, {z: true}],
            filtered : false
        }, afterChange);
        expect(autoCollection.event().emit).toBeCalledWith(EventType.ITEM_ADDED, {index: 0, item: {new: true}});
    });

    it('should insert last', function () {
        const {manager, autoCollection} = makeManagerInstance({data: [], all: [{x: true}, {y: true}, {z: true}]});
        const afterChange = jest.fn();
        manager.insertLast({new: true}, afterChange);
        expect(autoCollection.updateState).toBeCalledWith({
            all: [{x: true}, {y: true}, {z: true}, {new: true}],
            data: [{x: true}, {y: true}, {z: true}, {new: true}],
            filtered : false
        }, afterChange);
        expect(autoCollection.event().emit).toBeCalledWith(EventType.ITEM_ADDED, {index: 3, item: {new: true}});
    });

    it('should order data', function () {
        const {manager, autoCollection} = makeManagerInstance({data: [], all: [{z: true}, {x: true}, {y: true}]});
        const afterChange = jest.fn();
        manager.order(() => [{x: true}, {y: true}, {z: true}], afterChange);
        expect(autoCollection.updateState).toBeCalledWith({
            data: [{x: true}, {y: true}, {z: true}]
        }, afterChange);
        expect(autoCollection.event().emit).toBeCalledWith(EventType.DATA_REORDERED, [{x: true}, {y: true}, {z: true}]);
    });

    it('should remove at index', function () {
        const {manager, autoCollection} = makeManagerInstance({data: [], all: [{x: true}, {y: true}, {z: true}]});
        const afterChange = jest.fn();
        manager.removeAt(1, afterChange);
        expect(autoCollection.updateState).toBeCalledWith({
            all: [{x: true}, {z: true}],
            data: [{x: true}, {z: true}],
            filtered : false
        }, afterChange);
        expect(autoCollection.event().emit).toBeCalledWith(EventType.ITEM_REMOVED, {y: true});
    });

    it('should update at index', function () {
        const {manager, autoCollection} = makeManagerInstance({data: [], all: [{x: true}, {y: true}, {z: true}]});
        const afterChange = jest.fn();
        manager.updateItemAt(1, {yy: true}, afterChange);
        expect(autoCollection.updateState).toBeCalledWith({
            all: [{x: true}, {yy: true}, {z: true}],
            data: [{x: true}, {yy: true}, {z: true}],
            filtered : false
        }, afterChange);
        expect(autoCollection.event().emit).toBeCalledWith(EventType.ITEM_MODIFIED, {
            index: 1,
            old: {y: true},
            new: {yy: true}
        });
    });

});