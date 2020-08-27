import isEqual from 'lodash.isequal'
import {
    createSelectorCreator,
    defaultMemoize
} from 'reselect'
import { RootState } from '../../../bootstrap/root.store';
import { TableItem } from '../test-api.service';
import {
    TestTable,
    TestTaskState
} from './test-task.model';

/*
 * Helper selector to compare arrays and objects equality
 */
const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
);

/**
 * Redux state shortcut for testTask state
 */
const testTaskState = (root: RootState): TestTaskState => root.testTask;

/**
 * Redux shortcut for clickedCells
 */
const clickedCells = createDeepEqualSelector(
    (root: RootState): Array<TableItem> => testTaskState(root).clickedCells,
    (clickedCells: Array<TableItem>) => clickedCells
);

/**
 * Redux shortcut to isPageOpened
 */
const isPageOpened = (root: RootState): boolean => testTaskState(root).isPageOpened;

/**
 * Redux calculation flag to indicate that test task page is ready to use
 * NOTE: for now this is the same, but config can be extended in future
 */
const isTestTaskPageConfigured = (root: RootState): boolean => testTaskState(root).isPageOpened;

/**
 * Redux shortcut for testTable
 */
const testTable = (root: RootState): TestTable => testTaskState(root).testTable;

/**
 * General export for test task feature selectors
 */
export const testTaskSelectors = {
    clickedCells,
    isPageOpened,
    isTestTaskPageConfigured,
    testTable,
    testTaskState,
};
