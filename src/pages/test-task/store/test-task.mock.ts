import {
    RemoveCellCoordinates,
    TestTaskState
} from './test-task.model';
import { TableItem } from '../test-api.service';

/**
 * Mock data for table item info from backend
 */
export const tableItemMock: TableItem = {
    n: 200,
    x: 5,
    y: 10
}

/**
 * Mock data for table coordinates to delete cell
 */
export const coordinatesMock: RemoveCellCoordinates = {
    x: 5,
    y: 10
}

/**
 * Mocked data for for test task feature
 */
export const testTaskStateMock: TestTaskState = {
    clickedCells: [ { ...tableItemMock } ],
    isPageOpened: true,
    testTable: Array(5).fill(Array(5).fill(10))
};
