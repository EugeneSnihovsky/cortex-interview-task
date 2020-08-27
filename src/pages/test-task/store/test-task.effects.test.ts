import { Subject } from 'rxjs';
import {
    EffectsTester,
    createEffectsTester
} from '../../../shared/mocks/effects.mock';
import {
    TableItem,
    TestApiService as testApi
} from '../test-api.service';
import { testTaskServiceActions as testServiceActions } from './test-task.service.actions';
import { testTaskUserActions as testUserActions } from './test-task.user.actions';
import { testTaskSelectors as testSelectors } from './test-task.selectors';
import {
    TestTaskActions,
    TestTaskActionsTypes as Types
} from './test-task.model';
import { tableItemMock } from './test-task.mock';
import { testTaskEffects } from './test-task.effects';

/**
 * Unit test scenarios for testTaskEffects
 */
describe('effects: testTaskEffects', () => {

    let effects: EffectsTester;
    let action: TestTaskActions;
    let tableItem: TableItem;
    let error: Error;
    let connectSpy: jasmine.Spy;
    let isPageOpenedSpy: jasmine.Spy;
    let serverEvents$: Subject<TableItem>;

    beforeEach(() => {
        jest.resetAllMocks();
        effects = createEffectsTester(testTaskEffects);
        tableItem = { ...tableItemMock };
        error = new Error('error message');
        serverEvents$ = (testApi as any)._serverSubject$ = new Subject<TableItem>(); // eslint-disable-line
        connectSpy = spyOn(testApi, 'connect');
        isPageOpenedSpy = spyOn(testSelectors, 'isPageOpened');
        isPageOpenedSpy.and.returnValue(true);
    });
		
    describe('effect: CONNECT_TO_SERVER => establishConnection', () => {

        let notificationSpy: jasmine.Spy;

        beforeEach(() => {
            action = testServiceActions.connectToServer();
            notificationSpy = spyOn(console, 'error');
        });

        it('should initiate WS connection with test server', async () => {
            effects.dispatch(action);
            expect(connectSpy).toHaveBeenCalled();
        });

        it('should dispatch action to update table on server updates', async () => {
            effects.dispatch(action);
            serverEvents$.next(tableItem);
            await effects.waitFor(Types.TABLE_DATA_UPDATED);
            expect(effects.getCalledAction(Types.TABLE_DATA_UPDATED))
                .toEqual(testServiceActions.tableDataUpdated(tableItem));
        });

        it('should dispatch action to indicate that server failed', async () => {
            effects.dispatch(action);
            expect(connectSpy).toHaveBeenCalled();
            serverEvents$.error(error);
            await effects.waitFor(Types.ON_SERVER_ERROR);
            expect(effects.getCalledAction(Types.ON_SERVER_ERROR))
                .toEqual(testServiceActions.onServerFail(error));
        });

        it('should notify developer that server failed', async () => {
            effects.dispatch(action);
            expect(connectSpy).toHaveBeenCalled();
            serverEvents$.error(error);
            await effects.waitFor(Types.ON_SERVER_ERROR);
            expect(notificationSpy).toHaveBeenCalledWith(error);
        });

        it('should unsubscribe from websocket server when user left page', async () => {
            isPageOpenedSpy.and.returnValue(false);
            effects.dispatch(action);
            serverEvents$.next(tableItem);
            expect(effects.getCalledAction(Types.TABLE_DATA_UPDATED)).toEqual(undefined);
        });

    });

     describe('effect: TEST_TASK_PAGE_OPENED', () => {

        beforeEach(() => {
            action = testUserActions.pageOpened();
        });

        it('should dispatch action to establish WS connection', async () => {
            effects.dispatch(action);
            expect(effects.getCalledAction(Types.CONNECT_TO_SERVER)).toEqual(testServiceActions.connectToServer());
        });

    });

});
