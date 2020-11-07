import {DefaultEventManager} from "../../../Services/EventManager/EventManager";
import {mock} from "jest-mock-extended";
import {IAutoCollection} from "../../../AutoCollection/IAutoCollection";
import {EventType} from "../../../Services/EventManager/EventType";

describe('EventManager', () => {

    it('event workflow', function () {
        const autoCollection = mock<IAutoCollection>();
        const manager = new DefaultEventManager(autoCollection);
        const fetchDoneCallback = jest.fn();
        const fetchFailCallback = jest.fn();
        manager.addListener(EventType.FETCH_DONE, fetchDoneCallback);
        manager.addListener(EventType.FETCH_FAIL, fetchFailCallback);
        manager.emit(EventType.FETCH_DONE, {done: true});
        expect(fetchDoneCallback).toBeCalledWith(autoCollection, {done: true});
        expect(fetchFailCallback).not.toBeCalled();
        manager.removeListener(EventType.FETCH_DONE);
        manager.emit(EventType.FETCH_DONE, {done: true});
        expect(fetchDoneCallback).toBeCalledTimes(1);
        manager.emit(EventType.FETCH_FAIL, {fail: true});
        expect(fetchFailCallback).toBeCalledWith(autoCollection, {fail: true});
    });

})