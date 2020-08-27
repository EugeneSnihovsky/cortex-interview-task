import createSagaMiddleware from 'redux-saga';
import {
    applyMiddleware,
    combineReducers,
    createStore
} from 'redux';
import {
    all,
    fork
} from 'redux-saga/effects';
import {
    testTaskEffects,
    testTaskReducer,
    TestTaskState,
    testTaskStateInitial,
    testTaskStateMock
} from '../pages/test-task/store';

/**
 * All application states list info
 */
export interface RootState {
    testTask: TestTaskState;
}

/**
 * All application states list
 */
export const rootState: RootState = {
    testTask: testTaskStateInitial,
};

/**
 * Mock for all application states
 */
export const rootStateMock: RootState = {
    testTask: { ...testTaskStateMock },
};

/**
 * All application reducers list
 */
export const rootReducer = combineReducers({
    testTask: testTaskReducer,
});

/**
 * All application effects list
 */
export function* rootEffects() {
    yield all([
        fork(testTaskEffects),
    ]);
}

/**
 * Redux root store configuration
 */
const sagaMiddleware = createSagaMiddleware();
export const rootStore = createStore(rootReducer, rootState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootEffects);
