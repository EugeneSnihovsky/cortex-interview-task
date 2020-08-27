import {
    all,
    call,
    put,
    select,
    take,
    takeEvery,
} from 'redux-saga/effects';
import {
    eventChannel,
    EventChannel
} from 'redux-saga';
import {
    Subscription,
    throwError
} from 'rxjs';
import {
    catchError,
    tap
} from 'rxjs/operators';
import {
    TableItem,
    TestApiService as testApi
} from '../test-api.service';
import { TestTaskActionsTypes as TestTypes } from './test-task.model';
import { testTaskServiceActions as testServiceActions } from './test-task.service.actions';
import { testTaskSelectors as testSelectors } from './test-task.selectors';

/**
 * Effects list for test task feature
 */
export function* testTaskEffects() {
    yield all([
        takeEvery(TestTypes.CONNECT_TO_SERVER, establishConnection),
        takeEvery(TestTypes.ON_SERVER_ERROR, handleError),
        takeEvery(TestTypes.TEST_TASK_PAGE_OPENED, function* () { yield put(testServiceActions.connectToServer()); }),
    ]);
}

/**
 * Effect for establish connection to test WS server
 */
function* establishConnection() {
    try {
        const tableUpdatesChannel = yield call(createTableUpdatesChannel);

        while(true) {
            const isPageOpened: boolean = yield select(testSelectors.isPageOpened);
            const { error, tableItem }: TableEvent = yield take(tableUpdatesChannel);

            if (!isPageOpened) {
                tableUpdatesChannel.close();
                return; // stops cycle when WS connection closed
            }

            if (error) {
                yield put(testServiceActions.onServerFail(error));
            }

            if (tableItem) {
                yield put(testServiceActions.tableDataUpdated(tableItem));
            }
        }
    } catch (error) {
        yield put(testServiceActions.onServerFail(error));
    }
}

/*
 * Part of effect for receive table updates events
 */
function createTableUpdatesChannel(): EventChannel<TableEvent> {
    return eventChannel<TableEvent>((emit: (e: TableEvent) => void) => {
        testApi.connect(() => emit({ connected: true }));
        const subscription: Subscription = testApi.serverEvents$
            .pipe(
                tap((item: TableItem) => emit({ tableItem: item })),
                catchError((error: Error) => {
                    emit({ error: error });
                    return throwError(error);
                })
            )
            .subscribe();
        return () => subscription.unsubscribe();
    });
}

/**
 * Effect for handle errors from dispatched actions
 */
function handleError({ payload: error }: { type: TestTypes; payload: Error }) {
    console.error(error);
}

/**
 * Available table info received from WS
 */
interface TableEvent {
    connected?: boolean;
    tableItem?: TableItem;
    error?: Error;
}
