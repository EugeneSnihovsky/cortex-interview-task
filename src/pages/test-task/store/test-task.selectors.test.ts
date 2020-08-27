import {
    RootState,
    rootStateMock
} from '../../../bootstrap/root.store';
import { TestTaskState } from './test-task.model';
import { testTaskStateMock } from './test-task.mock';
import { testTaskSelectors as testSelectors } from './test-task.selectors';


/**
 * Unit test scenarios for testTaskSelectors
 */
describe('selectors: testTaskSelectors', () => {

    let rootState: RootState;
    let state: TestTaskState;

    beforeEach(() => {
        state = { ...testTaskStateMock };
        rootState = {
            ...rootStateMock,
            testTask: state
        };
    });

    describe('selector: clickedCells', () => {

        it('should return shortcut for clickedCells', () => {
            expect(testSelectors.clickedCells(rootState)).toEqual(state.clickedCells);
        });

    });

    describe('selector: isConnectionEstablished', () => {

        it('should return shortcut to isConnectionEstablished', () => {
            expect(testSelectors.isPageOpened(rootState)).toEqual(state.isPageOpened);
        });

    });

    describe('selector: isTestTaskPageConfigured', () => {

        it('should be same value as connection established flag', () => {
            expect(testSelectors.isTestTaskPageConfigured(rootState)).toEqual(state.isPageOpened);
        });

    });

    describe('selector: testTable', () => {

        it('should return shortcut for testTable', () => {
            expect(testSelectors.testTable(rootState)).toEqual(state.testTable);
        });

    });

    describe('selector: testTaskState', () => {

        it('should return shortcut for testTaskState', () => {
            expect(testSelectors.testTaskState(rootState)).toEqual(state);
        });

    });

});
