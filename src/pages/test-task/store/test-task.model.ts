import { TableItem } from '../test-api.service';
import { TestTaskUserActionsTypes } from './test-task.user.actions';
import { TestTaskServiceActionsTypes } from './test-task.service.actions';

/**
 * Test table cell data model
 */
export type TestTableCell = number;

/**
 * Test table row data model
 */
export type TestTableRow = Array<TestTableCell>;

/**
 * Test table data model
 */
export type TestTable = Array<TestTableRow>;

/**
 * Table coordinates to delete cell info
 */
export interface RemoveCellCoordinates {
    x: number;
    y: number;
}

/**
 * Represents test task feature state info
 */
export interface TestTaskState {

    /**
     * Clicked cells list
     */
    clickedCells: Array<TableItem>;

    /**
     * Flag to indicate that user located on current page
     */
    isPageOpened: boolean;

    /**
     * Test table data
     */
    testTable: TestTable;

}

/**
 * Initial state for test task feature
 */
export const testTaskStateInitial: TestTaskState = {
    clickedCells: [],
    isPageOpened: false,
    testTable: []
};

/**
 * Available action types for test task feature
 */
export enum TestTaskActionsTypes {
    CELL_CLICKED = 'TEST_TASK.CELL_CLICKED',
    CONNECT_TO_SERVER = 'TEST_TASK.CONNECT_TO_SERVER',
    ON_SERVER_ERROR = 'TEST_TASK.ON_SERVER_ERROR',
    REMOVE_TABLE_CELL = 'TEST_TASK.REMOVE_TABLE_CELL',
    TABLE_DATA_UPDATED = 'TEST_TASK.TABLE_DATA_UPDATED',
    TEST_TASK_PAGE_LEFT = 'TEST_TASK.TEST_TASK_PAGE_LEFT',
    TEST_TASK_PAGE_OPENED = 'TEST_TASK.TEST_TASK_PAGE_OPENED',
}

/**
 * Available actions for test-task feature
 */
export type TestTaskActions = TestTaskUserActionsTypes | TestTaskServiceActionsTypes;
